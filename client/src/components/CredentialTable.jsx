import React from "react";

const CopyIcon = () => (
  <svg
    className="w-4 h-4 text-gray-400 hover:text-indigo-400 transition-colors shrink-0"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
    />
  </svg>
);
const EditIcon = () => (
  <svg
    className="w-4.5 h-4.5"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
    />
  </svg>
);
const DeleteIcon = () => (
  <svg
    className="w-4.5 h-4.5"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
    />
  </svg>
);

const CredentialTable = ({
  credentials,
  isLoading,
  handleCopy,
  handleEdit,
  handleDelete,
  editingId,
}) => {
  return (
    <div className="glass-card rounded-3xl w-full p-6 md:p-8 overflow-hidden flex flex-col h-full min-h-100">
      <h2 className="text-2xl font-bold text-white mb-6">Your Vault Data</h2>

      {isLoading ? (
        <div className="text-center py-10 text-gray-400">
          Decrypting data...
        </div>
      ) : credentials.length === 0 ? (
        <div className="text-center py-10 text-gray-500 border border-dashed border-white/10 rounded-2xl">
          Your vault is empty. Save a credential to get started.
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse whitespace-nowrap table-fixed min-w-200">
            <thead>
              <tr className="border-b border-white/10 text-gray-400 text-sm">
                <th className="pb-4 pl-4 pr-6 font-medium w-[15%]">Platform</th>
                <th className="pb-4 pl-4 pr-16 font-medium w-[30%]">URL</th>
                <th className="pb-4 pl-4 pr-16 font-medium w-[25%]">
                  Login ID
                </th>
                <th className="pb-4 pl-4 pr-8 font-medium w-[20%]">Password</th>
                <th className="pb-4 px-4 font-medium w-[10%]">Actions</th>
              </tr>
            </thead>
            <tbody>
              {credentials.map((cred) => (
                <tr
                  key={cred._id}
                  className="border-b border-white/5 transition-colors group hover:bg-white/3"
                >
                  <td className="py-4 pl-4 pr-6 font-medium text-gray-200 truncate">
                    {cred.platform}
                  </td>

                  <td className="py-4 pl-4 pr-16 text-gray-400">
                    <div className="flex items-center justify-between gap-4 w-full overflow-hidden">
                      <span className="truncate" title={cred.websiteUrl}>
                        {cred.websiteUrl || "-"}
                      </span>
                      {cred.websiteUrl && (
                        <button
                          onClick={() => handleCopy(cred.websiteUrl)}
                          title="Copy URL"
                          className="shrink-0 focus:outline-none p-1.5 hover:bg-white/5 rounded-md transition-colors"
                        >
                          <CopyIcon />
                        </button>
                      )}
                    </div>
                  </td>

                  <td className="py-4 pl-4 pr-16 text-gray-300">
                    <div className="flex items-center justify-between gap-4 w-full overflow-hidden">
                      <span className="truncate" title={cred.loginId}>
                        {cred.loginId}
                      </span>
                      <button
                        onClick={() => handleCopy(cred.loginId)}
                        title="Copy Login ID"
                        className="shrink-0 focus:outline-none p-1.5 hover:bg-white/5 rounded-md transition-colors"
                      >
                        <CopyIcon />
                      </button>
                    </div>
                  </td>

                  <td className="py-4 pl-4 pr-8 text-gray-300">
                    <div className="flex items-center justify-between gap-2 w-full overflow-hidden">
                      <span className="truncate tracking-widest font-mono text-sm mt-0.5">
                        ••••••••••••
                      </span>
                      <button
                        onClick={() =>
                          handleCopy(
                            cred.decryptedPassword || "Decryption Failed",
                          )
                        }
                        title="Copy Password"
                        className="shrink-0 focus:outline-none p-1.5 hover:bg-white/5 rounded-md transition-colors"
                      >
                        <CopyIcon />
                      </button>
                    </div>
                  </td>

                  <td className="py-4 px-4 text-right">
                    <div className="flex items-center justify-end gap-3">
                      <button
                        onClick={() => handleEdit(cred)}
                        title="Edit"
                        className="transition-colors focus:outline-none p-1.5 rounded-md text-gray-300 hover:bg-white/5 hover:text-indigo-400"
                      >
                        <EditIcon />
                      </button>
                      <button
                        onClick={() => handleDelete(cred._id)}
                        title="Delete"
                        className="transition-colors focus:outline-none p-1.5 rounded-md text-gray-300 hover:bg-white/5 hover:text-red-400"
                      >
                        <DeleteIcon />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default CredentialTable;
