import React, { createContext, useState } from "react";

const useAuthStore = () => {
  const [isLoading, setIsLoading] = useState(false);

  return {
    isLoading,
    setIsLoading,
  };
};
type AuthStoreType = ReturnType<typeof useAuthStore>;

export const AuthContext = createContext({} as AuthStoreType);
export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const store = useAuthStore();
  return <AuthContext.Provider value={store}>{children}</AuthContext.Provider>;
};
