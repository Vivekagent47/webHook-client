import { User, UserRegisterData } from "@/types/user";
import { create } from "zustand";

interface IAuthStore {
  isLoading: boolean;
  user: User | undefined;
  registerData: UserRegisterData;
  activePage: "login" | "register";
  setIsLoading: (isLoading: boolean) => void;
  setRegisterData: (data: Partial<UserRegisterData>) => void;
  setActivePage: (page: "login" | "register") => void;
}

export const useAuthStore = create<IAuthStore>((set) => ({
  isLoading: false,
  user: undefined,
  activePage: "login",
  registerData: {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  },
  setRegisterData: (data: Partial<UserRegisterData>) =>
    set((state) => ({ registerData: { ...state.registerData, ...data } })),
  setIsLoading: (isLoading: boolean) => set({ isLoading }),
  setActivePage: (page: "login" | "register") => set({ activePage: page }),
}));
