import { User, UserRole } from "./user";

export type Organization = {
  id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
};

export type UserOrganization = Organization & {
  role: UserRole;
};

export type OrganizationMember = User & {
  role: UserRole;
};

export type AddMemberType = {
  userEmail: string;
  role: UserRole;
};
