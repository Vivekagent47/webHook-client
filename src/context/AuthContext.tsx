import React, { createContext, useEffect, useMemo } from "react";
import { toast } from "sonner";

import apis from "@/apis";
import useLocalStorageString from "@/lib/useLocalStorage";
import { decodeToken } from "@/lib/utils";
import { UserRegisterData } from "@/types/user";

const useAuthStore = () => {
  const [accessToken, setAccessToken] = useLocalStorageString(
    "access-token",
    "",
  );
  const [refreshToken, setRefreshToken] = useLocalStorageString(
    "refresh-token",
    "",
  );
  const isLogged = useMemo(() => !!accessToken, [accessToken]);

  const tokenDetails = useMemo(
    () => (accessToken ? decodeToken(accessToken) : undefined),
    [accessToken],
  );
  const user = useMemo(() => tokenDetails?.user, [tokenDetails]);
  const orgId = useMemo(() => tokenDetails?.orgId, [tokenDetails]);

  async function login({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) {
    const response = await apis.auth.login({ email, password });
    setAccessToken(response.accessToken);
    setRefreshToken(response.refreshToken);
  }

  async function signUp(data: UserRegisterData) {
    const response = await apis.auth.register(data);
    setAccessToken(response.accessToken);
    setRefreshToken(response.refreshToken);
  }

  async function refetchAccessToken() {
    try {
      const response = await apis.auth.fetchToken(refreshToken);
      if (!response) return;
      setAccessToken(response.accessToken);
      setRefreshToken(response.refreshToken);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      setAccessToken("");
      setRefreshToken("");
      toast.error("Unable to fetch token", {
        description: err?.message,
      });
    }
  }

  async function logout() {
    setAccessToken("");
    setRefreshToken("");
  }

  useEffect(() => {
    if (tokenDetails) {
      const now = Date.now();
      const expiresAt = tokenDetails.exp * 1000;
      const timeLeft = expiresAt - now;
      if (timeLeft < 0) {
        refetchAccessToken();
      }
    }
  }, []);

  return {
    user,
    orgId,
    isLogged,
    login,
    signUp,
    logout,
  };
};

type AuthStoreType = ReturnType<typeof useAuthStore>;
export const AuthContext = createContext({} as AuthStoreType);
export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const store = useAuthStore();
  return <AuthContext.Provider value={store}>{children}</AuthContext.Provider>;
};
