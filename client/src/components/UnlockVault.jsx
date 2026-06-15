import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import PasswordInput from "./PasswordInput";

const UnlockVault = ({ setMasterPassword, userSalt }) => {
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleUnlock = (e) => {
    e.preventDefault();
    if (password) setMasterPassword(password);
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
                className="w-full bg-white/90 text-indigo-800 font-bold py-3 mt-2 rounded-xl hover:bg-white transition-all duration-300"
              >
                Unlock Vault
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
};

export default UnlockVault;
