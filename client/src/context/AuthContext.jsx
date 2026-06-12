import React, { createContext, useState, useContext } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [masterPassword, setMasterPassword] = useState(null);

  const clearMasterPassword = () => {
    setMasterPassword(null);
  };

  return (
    <AuthContext.Provider
      value={{ masterPassword, setMasterPassword, clearMasterPassword }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
