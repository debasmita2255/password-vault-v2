import React from "react";

const PasswordRequirements = ({ criteria }) => {
  return (
    <div className="bg-black/20 rounded-xl p-4 mt-2 text-sm">
      <p className="text-gray-300 font-medium mb-2">Password Requirements:</p>
      <ul className="flex flex-col gap-1.5">
        <li
          className={`flex items-center gap-2 transition-colors duration-300 ${criteria.length ? "text-green-400" : "text-gray-500"}`}
        >
          <svg
            className="w-4 h-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            {criteria.length ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M5 13l4 4L19 7"
              />
            ) : (
              <circle cx="12" cy="12" r="3" />
            )}
          </svg>
          At least 12 characters
        </li>
        <li
          className={`flex items-center gap-2 transition-colors duration-300 ${criteria.uppercase ? "text-green-400" : "text-gray-500"}`}
        >
          <svg
            className="w-4 h-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            {criteria.uppercase ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M5 13l4 4L19 7"
              />
            ) : (
              <circle cx="12" cy="12" r="3" />
            )}
          </svg>
          One uppercase letter
        </li>
        <li
          className={`flex items-center gap-2 transition-colors duration-300 ${criteria.lowercase ? "text-green-400" : "text-gray-500"}`}
        >
          <svg
            className="w-4 h-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            {criteria.lowercase ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M5 13l4 4L19 7"
              />
            ) : (
              <circle cx="12" cy="12" r="3" />
            )}
          </svg>
          One lowercase letter
        </li>
        <li
          className={`flex items-center gap-2 transition-colors duration-300 ${criteria.number ? "text-green-400" : "text-gray-500"}`}
        >
          <svg
            className="w-4 h-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            {criteria.number ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M5 13l4 4L19 7"
              />
            ) : (
              <circle cx="12" cy="12" r="3" />
            )}
          </svg>
          One number
        </li>
        <li
          className={`flex items-center gap-2 transition-colors duration-300 ${criteria.special ? "text-green-400" : "text-gray-500"}`}
        >
          <svg
            className="w-4 h-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            {criteria.special ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M5 13l4 4L19 7"
              />
            ) : (
              <circle cx="12" cy="12" r="3" />
            )}
          </svg>
          One special character (!@#$%^&*)
        </li>
      </ul>
    </div>
  );
};

export default PasswordRequirements;
