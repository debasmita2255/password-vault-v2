import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import api from "../api";
import Navbar from "../components/Navbar";
import PageTransition from "../components/PageTransition";
import PasswordInput from "../components/PasswordInput";
import PasswordRequirements from "../components/PasswordRequirements";
import { useAuth } from "../context/AuthContext";
import { encryptPassword, decryptPassword } from "../utils/encryption";

const Profile = () => {
  const navigate = useNavigate();
  const { masterPassword, setMasterPassword, clearMasterPassword } = useAuth();

  const [userInfo, setUserInfo] = useState({
    username: "Loading...",
    email: "Loading...",
  });

  const [showPasswordForm, setShowPasswordForm] = useState(false);
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await api.get("/users/userDetails");
        setUserInfo({
          username: res.data.user.username,
          email: res.data.user.email,
        });
      } catch (error) {
        toast.error("Failed to load profile data.");
      }
    };
    fetchProfile();
  }, []);

  const calculateStrength = (password) => {
    return {
      length: password.length >= 12,
      uppercase: /[A-Z]/.test(password),
      lowercase: /[a-z]/.test(password),
      number: /[0-9]/.test(password),
      special: /[^A-Za-z0-9]/.test(password),
    };
  };

  const criteria = calculateStrength(passwordData.newPassword);
  const isPasswordStrong = Object.values(criteria).every(Boolean);
  const passwordsMatch =
    passwordData.newPassword === passwordData.confirmPassword;

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    if (!isPasswordStrong || !passwordsMatch) return;

    try {
      const userSalt = localStorage.getItem("userSalt");

      // Fetch current encrypted vault
      const res = await api.get("/credentials/getAll");
      const vaultData = res.data.credentials || [];

      // Decrypt & Re-encrypt entirely in RAM
      const updatedVault = vaultData.map((cred) => {
        const plainText = decryptPassword(
          cred.encryptedPassword,
          cred.iv,
          passwordData.currentPassword,
          userSalt,
        );

        if (!plainText) {
          throw new Error("Current password incorrect or vault corrupted.");
        }

        const { encryptedPassword, iv } = encryptPassword(
          plainText,
          passwordData.newPassword,
          userSalt,
        );

        return {
          _id: cred._id,
          encryptedPassword,
          iv,
        };
      });

      await api.post("/users/change-password", {
        currentPassword: passwordData.currentPassword,
        newPassword: passwordData.newPassword,
        updatedCredentials: updatedVault,
      });

      setMasterPassword(passwordData.newPassword);
      toast.success(
        "Master password changed and vault re-encrypted successfully!",
      );
      setShowPasswordForm(false);
      setPasswordData({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
    } catch (error) {
      toast.error(
        error.response?.data?.error ||
          error.message ||
          "Failed to change password.",
      );
    }
  };

  const handleExportData = async () => {
    try {
      const userSalt = localStorage.getItem("userSalt");
      const res = await api.get("/credentials/getAll");
      const vaultData = res.data.credentials || [];

      if (vaultData.length === 0) {
        toast.error("Your vault is empty. Nothing to export.");
        return;
      }

      let csvContent = "Platform,Website URL,Login ID,Password\n";

      vaultData.forEach((cred) => {
        const plainText = decryptPassword(
          cred.encryptedPassword,
          cred.iv,
          masterPassword,
          userSalt,
        );

        const platform = `"${(cred.platform || "").replace(/"/g, '""')}"`;
        const url = `"${(cred.websiteUrl || "").replace(/"/g, '""')}"`;
        const login = `"${(cred.loginId || "").replace(/"/g, '""')}"`;
        const password = `"${(plainText || "DECRYPTION FAILED").replace(/"/g, '""')}"`;

        csvContent += `${platform},${url},${login},${password}\n`;
      });

      const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
      const link = document.createElement("a");
      const linkUrl = URL.createObjectURL(blob);
      link.setAttribute("href", linkUrl);
      link.setAttribute("download", "My_Decrypted_Vault.csv");
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      toast.success("Decrypted data exported successfully!");
    } catch (error) {
      toast.error("Failed to export data.");
    }
  };

  const handleDeleteAccount = async () => {
    const confirmDelete = window.confirm(
      "CRITICAL WARNING: Are you absolutely sure you want to delete your account? All your credentials will be permanently destroyed. This cannot be undone.",
    );

    if (!confirmDelete) return;

    const passwordCheck = window.prompt(
      "To confirm permanent deletion, please enter your Master Password:",
    );

    if (passwordCheck !== masterPassword) {
      toast.error("Incorrect Master Password. Account deletion aborted.");
      return;
    }

    try {
      await api.delete("/users/delete");
      toast.success("Account deleted successfully.");

      localStorage.removeItem("userLoggedIn");
      localStorage.removeItem("userSalt");
      clearMasterPassword();

      navigate("/login");
    } catch (error) {
      toast.error("Failed to delete account.");
    }
  };

  const handleInputChange = (e) => {
    setPasswordData({ ...passwordData, [e.target.name]: e.target.value });
  };

  return (
    <div className="min-h-screen pt-36 px-4 md:px-8 pb-20">
      <Navbar />
      <PageTransition>
        <div className="w-full max-w-2xl mx-auto glass-card rounded-3xl p-8 relative z-10">
          <h2 className="text-3xl font-bold text-white mb-8 border-b border-white/10 pb-4">
            Account Settings
          </h2>

          {/* User info section */}
          <div className="mb-8">
            <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-4">
              Profile details
            </h3>
            <div className="bg-black/20 rounded-xl p-4 flex flex-col gap-2">
              <p className="text-white">
                <span className="text-gray-400 mr-2">Username:</span>{" "}
                {userInfo.username}
              </p>
              <p className="text-white">
                <span className="text-gray-400 mr-2">Email:</span>{" "}
                {userInfo.email}
              </p>
            </div>
          </div>

          {/* Change password section */}
          <div className="mb-8">
            {!showPasswordForm ? (
              <button
                onClick={() => setShowPasswordForm(true)}
                className="w-full bg-indigo-500/10 hover:bg-indigo-500/20 text-indigo-300 transition-colors duration-300 py-3 rounded-xl font-medium border border-indigo-500/20"
              >
                Change Master Password
              </button>
            ) : (
              <form
                onSubmit={handlePasswordChange}
                className="bg-black/20 rounded-xl p-4 flex flex-col gap-4"
              >
                {/* The Hidden Field to satisfy Chrome's password manager */}
                <input
                  type="text"
                  name="username"
                  value={userInfo.email || userInfo.username}
                  autoComplete="username"
                  className="hidden"
                  readOnly
                />

                <PasswordInput
                  name="currentPassword"
                  value={passwordData.currentPassword}
                  onChange={handleInputChange}
                  placeholder="Current Master Password"
                  autoComplete="current-password"
                />

                <PasswordInput
                  name="newPassword"
                  value={passwordData.newPassword}
                  onChange={handleInputChange}
                  placeholder="New Master Password"
                  autoComplete="new-password"
                />

                {passwordData.newPassword && (
                  <PasswordRequirements criteria={criteria} />
                )}

                <PasswordInput
                  name="confirmPassword"
                  value={passwordData.confirmPassword}
                  onChange={handleInputChange}
                  placeholder="Confirm New Password"
                  autoComplete="new-password"
                />

                {passwordData.confirmPassword && !passwordsMatch && (
                  <p className="text-red-400 text-sm pl-2">
                    Passwords do not match.
                  </p>
                )}

                <div className="flex gap-4 mt-2">
                  <button
                    type="submit"
                    disabled={!isPasswordStrong || !passwordsMatch}
                    className="btn-primary flex-1"
                  >
                    Update Password
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setShowPasswordForm(false);
                      setPasswordData({
                        currentPassword: "",
                        newPassword: "",
                        confirmPassword: "",
                      });
                    }}
                    className="flex-1 bg-transparent border border-white/20 text-white hover:bg-white/5 py-2 rounded-xl transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            )}
          </div>

          {/* Export section */}
          <div className="mb-8">
            <button
              onClick={handleExportData}
              disabled={!masterPassword}
              className={`w-full transition-all duration-300 py-3 rounded-xl font-medium border ${
                !masterPassword
                  ? "bg-indigo-200/10 text-gray-500 border-gray-700/50 cursor-not-allowed opacity-70"
                  : "bg-indigo-500/10 hover:bg-indigo-500/20 text-indigo-300 border-indigo-500/20"
              }`}
            >
              {!masterPassword
                ? "Vault Locked - Cannot Export"
                : "Export Decrypted Vault Data (CSV)"}
            </button>
          </div>

          {/* Delete account section */}
          <div>
            <h3 className="text-sm font-bold text-red-400/80 uppercase tracking-wider mb-4">
              Danger Zone
            </h3>
            <div className="flex flex-col gap-4">
              <button
                onClick={handleDeleteAccount}
                className="w-full bg-red-500/10 hover:bg-red-500/20 text-red-400 transition-colors duration-300 py-3 rounded-xl font-medium border border-red-500/20"
              >
                Permanently Delete Account
              </button>
            </div>
          </div>
        </div>
      </PageTransition>
    </div>
  );
};

export default Profile;
