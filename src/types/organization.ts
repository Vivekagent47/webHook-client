import { UserRole } from "./user";

export type Organization = {
  id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
};

export type UserOrganization = Organization & {
  role: UserRole;
};
