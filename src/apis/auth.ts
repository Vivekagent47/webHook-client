import AxiosInstance from "@/lib/axios";
import { AuthTokens } from "@/types/auth";
import { UserRegisterData } from "@/types/user";

export async function login(data: { email: string; password: string }) {
  const res = await AxiosInstance({
    method: "POST",
    url: "/auth/login",
    data: data,
  });

  return res.data as AuthTokens;
}

export async function register(data: UserRegisterData) {
  const res = await AxiosInstance({
    method: "POST",
    url: "/auth/register",
    data: data,
  });

  return res.data as AuthTokens;
}

export async function fetchToken(refreshToken: string) {
  const res = await AxiosInstance({
    method: "POST",
    url: "/auth/refresh",
    data: {
      refreshToken,
    },
  });

  return res.data as AuthTokens;
}

export async function logout() {
  await AxiosInstance({
    method: "POST",
    url: "/auth/logout",
  });
}

export async function changeOrg(orgId: string) {
  const data = await AxiosInstance({
    method: "POST",
    url: `/auth/change-org/${orgId}`,
  });

  return data.data as AuthTokens;
}
