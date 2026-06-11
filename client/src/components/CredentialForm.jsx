import React from "react";
import PasswordInput from "./PasswordInput";

const CredentialForm = ({
  formData,
  handleChange,
  handleSubmit,
  isSubmitting,
  editingId,
  cancelEdit,
  handleClear,
}) => {
  return (
    <div className="flex flex-col space-y-8">
      <div className="text-center lg:text-left">
        <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">
          <span className="text-indigo-400">Forget forgetting</span>
          <br />
          Stash your credentials here
        </h1>
        <p className="text-gray-400 font-medium">Don't worry, it's safe!</p>
      </div>

      <div className="glass-card rounded-3xl w-full p-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Platform Name
            </label>
            <input
              type="text"
              name="platform"
              value={formData.platform}
              onChange={handleChange}
              placeholder="e.g., Netflix"
              required
              className="input-field"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Website URL{" "}
              <span className="text-gray-500 text-xs font-normal">
                (Optional)
              </span>
            </label>
            <input
              type="url"
              name="websiteUrl"
              value={formData.websiteUrl}
              onChange={handleChange}
              placeholder="https://netflix.com"
              className="input-field"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Login ID (Username / Email)
            </label>
            <input
              type="text"
              name="loginId"
              value={formData.loginId}
              onChange={handleChange}
              placeholder="johndoe@example.com"
              required
              className="input-field"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Password
            </label>
            <PasswordInput
              name="password"
              value={formData.password}
              onChange={handleChange}
            />
          </div>

          <div className="flex gap-3 mt-4">
            <button
              type="submit"
              disabled={isSubmitting}
              className="btn-primary flex-1"
            >
              {isSubmitting ? "Encrypting..." : editingId ? "Update" : "Save"}
            </button>

            <button
              type="button"
              onClick={editingId ? cancelEdit : handleClear}
              className="px-6 py-3 rounded-xl bg-white/5 text-white font-bold hover:bg-white/10 transition-colors border border-white/10"
            >
              {editingId ? "Cancel" : "Clear"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CredentialForm;
