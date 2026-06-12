import React, { useState } from "react";
import PasswordInput from "./PasswordInput";

const UnlockVault = ({ setMasterPassword }) => {
  const [password, setPassword] = useState("");

  const handleUnlock = (e) => {
    e.preventDefault();
    if (password) setMasterPassword(password);
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 relative z-10">
      <div className="glass-card rounded-3xl p-8 max-w-md w-full text-center">
        <img
          src="../../../public/stroke_lock.svg"
          alt="Vault Locked"
          className="w-12 h-12 mx-auto mb-4"
        />

        <h2 className="text-2xl font-bold text-white mb-2">Vault Locked</h2>
        <p className="text-gray-400 text-sm mb-6">
          Your session is active, but your decryption key was cleared from
          memory. Please enter your Master Password to unlock your vault.
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
            className="w-full bg-white/90 text-indigo-800 font-bold py-3 rounded-xl hover:bg-white transition-all duration-300"
          >
            Unlock Vault
          </button>
        </form>
      </div>
    </div>
  );
};

export default UnlockVault;
