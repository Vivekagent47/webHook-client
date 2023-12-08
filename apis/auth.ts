import AxiosInstance from "@/lib/axios";
import { UserRegisterData } from "@/types/user";

export async function login(data: { email: string; password: string }) {
  const res = await AxiosInstance({
    method: "POST",
    url: "/auth/login",
    data: data,
  });

  return res.data;
}

export async function register(data: UserRegisterData) {
  const res = await AxiosInstance({
    method: "POST",
    url: "/auth/register",
    data: data,
  });

  return res.data;
}

export async function fetchToken() {
  const refreshToken = localStorage.getItem("refreshToken");

  if (!refreshToken) {
    return null;
  }

  const res = await AxiosInstance({
    method: "POST",
    url: "/auth/refresh",
    data: {
      refreshToken,
    },
  });
}
