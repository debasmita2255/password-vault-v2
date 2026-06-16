import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import api from "../api";
import PasswordInput from "./PasswordInput";
import { decryptPassword } from "../utils/encryption";

const UnlockVault = ({ setMasterPassword, userSalt }) => {
  const [password, setPassword] = useState("");
  const [isUnlocking, setIsUnlocking] = useState(false);
  const navigate = useNavigate();

  const handleUnlock = async (e) => {
    e.preventDefault();
    if (!password) return;

    setIsUnlocking(true);
    try {
      // fetch the vault data to test the password
      const res = await api.get("/credentials/getAll");
      const vaultData = res.data.credentials || [];

      // Scenario A: Vault has items (Zero-Knowledge Decryption Test)
      if (vaultData.length > 0) {
        const testDecrypt = decryptPassword(
          vaultData[0].encryptedPassword,
          vaultData[0].iv,
          password,
          userSalt,
        );

        if (!testDecrypt) {
          toast.error("Incorrect Master Password. Please try again.");
          setIsUnlocking(false);
          return;
        }
      }
      // Scenario B: Vault is empty (Server-Side Hash Check)
      else {
        try {
          const userRes = await api.get("/users/userDetails");
          const email = userRes.data.user.email;

          // ping the login route purely to check if the password matches the hash
          await api.post("/users/login", { email, password });
        } catch (error) {
          // if the login route throws an error, the password was wrong
          toast.error("Incorrect Master Password. Please try again.");
          setIsUnlocking(false);
          return;
        }
      }

      // if we made it here, the password is mathematically verified
      setMasterPassword(password);
      toast.success("Vault unlocked successfully!");
    } catch (error) {
      toast.error("Error verifying password. Please try again.");
    } finally {
      setIsUnlocking(false);
    }
  };

  // a safety function to completely wipe the session with missing salt
  const forceLogout = () => {
    localStorage.removeItem("userLoggedIn");
    localStorage.removeItem("userSalt");
    navigate("/login", { replace: true });
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 relative z-10">
      <div className="glass-card rounded-3xl p-8 max-w-md w-full text-center">
        <img
          src="/stroke_lock.svg"
          alt="Vault Locked"
          className="w-12 h-12 mx-auto mb-4"
        />

        {!userSalt ? (
          <>
            <h2 className="text-2xl font-bold text-white mb-2">
              Session Corrupted
            </h2>
            <p className="text-gray-400 text-sm mb-6">
              Your cryptographic salt is missing. For your safety, the vault has
              been locked. Please log&nbsp;in again to restore your session.
            </p>
            <button
              onClick={forceLogout}
              className="w-full bg-red-500/10 text-red-400 border border-red-500/20 font-bold py-3 rounded-xl hover:bg-red-500/20 transition-all duration-300"
            >
              Return to Login
            </button>
          </>
        ) : (
          <>
            <h2 className="text-2xl font-bold text-white mb-2">Vault Locked</h2>
            <p className="text-gray-400 text-sm mb-6">
              Your session is active, but your decryption key was cleared from
              memory. Please enter your Master Password (the registration
              password) to unlock your vault.
            </p>

            <form onSubmit={handleUnlock} className="flex flex-col gap-4">
              <PasswordInput
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Master Password"
              />
              <button
                type="submit"
                disabled={isUnlocking}
                className="w-full bg-white/90 text-indigo-800 font-bold py-3 mt-2 rounded-xl hover:bg-white transition-all duration-300"
              >
                {isUnlocking ? "Verifying..." : "Unlock Vault"}
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
};

export default UnlockVault;
