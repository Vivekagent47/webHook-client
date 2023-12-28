import { UserOrganization } from "./organization";

export type User = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  createdAt: string;
  updatedAt: string;
};

export enum UserRole {
  OWNER = "owner",
  ADMIN = "admin",
  MEMBER = "member",
}

export type UserRegisterData = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
};

export type AuthTokens = {
  accessToken: string;
  refreshToken: string;
};

export type UserAuthData = {
  user: User;
  tokens: AuthTokens;
  organizations: UserOrganization[];
};
