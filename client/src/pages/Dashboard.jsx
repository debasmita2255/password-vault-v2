import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";
import Navbar from "../components/Navbar";
import PageTransition from "../components/PageTransition";
import api from "../api";
import CredentialForm from "../components/CredentialForm";
import CredentialTable from "../components/CredentialTable";
import { encryptPassword, decryptPassword } from "../utils/encryption";
import { useAuth } from "../context/AuthContext";
import UnlockVault from "../components/UnlockVault";

const Dashboard = () => {
  const { masterPassword, setMasterPassword } = useAuth();

  const userSalt = localStorage.getItem("userSalt");

  const [formData, setFormData] = useState({
    platform: "",
    loginId: "",
    password: "",
    websiteUrl: "",
  });

  const [credentials, setCredentials] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [editingId, setEditingId] = useState(null);

  const fetchCredentials = async () => {
    try {
      const res = await api.get("/credentials/getAll");
      const encryptedData = res.data.credentials || [];

      // decrypt the vault immediately upon fetching
      const decryptedVault = encryptedData.map((cred) => {
        const plainText = decryptPassword(
          cred.encryptedPassword,
          cred.iv,
          masterPassword,
          userSalt,
        );
        return {
          ...cred,
          decryptedPassword: plainText || "Decryption Failed",
        };
      });

      setCredentials(decryptedVault);
    } catch (error) {
      toast.error(error.response?.data?.error || "Could not load your vault.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    // only attempt to fetch if the master password is in RAM
    if (masterPassword) {
      // thread yielding since PBKDF2 is a heavy, synchronous mathematical operation and completely locks up the browser's main thread
      const timeoutId = setTimeout(() => {
        fetchCredentials();
      }, 500);

      // cleanup function in case the user quickly navigates away
      return () => clearTimeout(timeoutId);
    }
  }, [masterPassword]);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleCopy = (text) => {
    if (!text) return;

    if (text === "Decryption Failed") {
      toast.error("Cannot copy: Decryption failed or data is corrupted.");
      return;
    }

    navigator.clipboard.writeText(text);
    toast.success("Copied to clipboard!");
  };

  const handleClear = () => {
    setFormData({ platform: "", loginId: "", password: "", websiteUrl: "" });
  };

  const handleEdit = (cred) => {
    if (editingId) {
      toast.error("Please save or cancel your current edit first.");
      return;
    }

    setFormData({
      platform: cred.platform,
      loginId: cred.loginId,
      password: cred.decryptedPassword || "",
      websiteUrl: cred.websiteUrl || "",
    });
    setEditingId(cred._id);

    // only scroll to top on smaller screens where the input form sits at the top of the screen
    if (window.innerWidth < 1024) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const cancelEdit = () => {
    setEditingId(null);
    handleClear();
  };

  const handleDelete = async (id) => {
    if (editingId) {
      toast.error("Please save or cancel your current edit first.");
      return;
    }

    if (
      !window.confirm(
        "Are you sure you want to permanently delete this credential?",
      )
    )
      return;
    try {
      const res = await api.delete(`/credentials/delete/${id}`);
      toast.success(res.data.success);
      setCredentials((prev) => prev.filter((item) => item._id !== id));
    } catch (error) {
      toast.error(
        error.response?.data?.error || "Failed to delete credentials.",
      );
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // encrypt the password before transmission
      const { encryptedPassword, iv } = encryptPassword(
        formData.password,
        masterPassword,
        userSalt,
      );

      const payload = {
        platform: formData.platform,
        loginId: formData.loginId,
        websiteUrl: formData.websiteUrl,
        encryptedPassword: encryptedPassword,
        iv: iv,
      };

      if (editingId) {
        const res = await api.put(`/credentials/update/${editingId}`, payload);
        toast.success(res.data.success);

        setCredentials((prev) =>
          prev.map((item) =>
            item._id === editingId
              ? { ...res.data.credential, decryptedPassword: formData.password }
              : item,
          ),
        );

        setEditingId(null);
      } else {
        const res = await api.post("/credentials/add", payload);
        toast.success(res.data.success);

        setCredentials((prev) => [
          { ...res.data.credential, decryptedPassword: formData.password },
          ...prev,
        ]);
      }

      handleClear();
    } catch (error) {
      toast.error(error.response?.data?.error || "Failed to save credentials.");
      if (editingId) fetchCredentials();
    } finally {
      setIsSubmitting(false);
    }
  };

  // if master password or salt is not saved in RAM, show unlock screen
  if (!masterPassword || !userSalt) {
    return (
      <>
        <Navbar />
        <PageTransition>
          <UnlockVault
            setMasterPassword={setMasterPassword}
            userSalt={userSalt}
          />
        </PageTransition>
      </>
    );
  }

  return (
    <div className="min-h-screen pt-36 px-4 md:px-8 pb-20">
      <Navbar />
      <PageTransition>
        <div className="w-full max-w-[96vw] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 xl:gap-12 items-start">
          <div className="lg:col-span-5 xl:col-span-4 w-full lg:sticky lg:top-36 relative z-10">
            <CredentialForm
              formData={formData}
              handleChange={handleChange}
              handleSubmit={handleSubmit}
              isSubmitting={isSubmitting}
              editingId={editingId}
              cancelEdit={cancelEdit}
              handleClear={handleClear}
            />
          </div>

          <div className="lg:col-span-7 xl:col-span-8 w-full relative z-0">
            <CredentialTable
              credentials={credentials}
              isLoading={isLoading}
              handleCopy={handleCopy}
              handleEdit={handleEdit}
              handleDelete={handleDelete}
              editingId={editingId}
            />
          </div>
        </div>
      </PageTransition>
    </div>
  );
};

export default Dashboard;
