import React, { createContext, useState } from "react";

const useAuthStore = () => {
  const [loading, setLoading] = useState(false);

  return {
    loading,
    setLoading,
  };
};
type AuthStoreType = ReturnType<typeof useAuthStore>;

export const AuthContext = createContext({} as AuthStoreType);
export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const store = useAuthStore();
  return <AuthContext.Provider value={store}>{children}</AuthContext.Provider>;
};
