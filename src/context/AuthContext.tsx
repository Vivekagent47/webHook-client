import React, { createContext, useEffect, useMemo, useState } from "react";

import apis from "@/apis";
import { errorToast } from "@/lib/error";
import useLocalStorageString from "@/lib/useLocalStorage";
import { decodeToken } from "@/lib/utils";
import { User, UserRegisterData } from "@/types/user";

const useAuthStore = () => {
  const [accessToken, setAccessToken] = useLocalStorageString(
    "access-token",
    "",
  );
  const [refreshToken, setRefreshToken] = useLocalStorageString(
    "refresh-token",
    "",
  );
  const [pageNotFound, setPageNotFound] = useState(false);

  const tokenDetails = useMemo(
    () => (accessToken ? decodeToken(accessToken) : undefined),
    [accessToken],
  );
  const user = useMemo(() => tokenDetails?.user as User, [tokenDetails]);
  const orgId = useMemo(() => tokenDetails?.orgId as string, [tokenDetails]);
  const isLogged = useMemo(() => !!user, [user]);

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
    } catch (err) {
      setAccessToken("");
      setRefreshToken("");
      errorToast("Unable to fetch token", err);
    }
  }

  async function logout() {
    await apis.auth.logout();
    setAccessToken("");
    setRefreshToken("");
  }

  async function changeOrg(orgId: string) {
    try {
      const data = await apis.auth.changeOrg(orgId);
      setAccessToken(data.accessToken);
      setRefreshToken(data.refreshToken);
    } catch (err) {
      errorToast("Unable to change organization.", err);
    }
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
  }, [tokenDetails]);

  return {
    user,
    orgId,
    isLogged,
    login,
    signUp,
    logout,
    pageNotFound,
    setPageNotFound,
    changeOrg,
  };
};

type AuthStoreType = ReturnType<typeof useAuthStore>;
export const AuthContext = createContext({} as AuthStoreType);
export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const store = useAuthStore();
  return <AuthContext.Provider value={store}>{children}</AuthContext.Provider>;
};
