import AxiosInstance from "@/lib/axios";
import {
  AddMemberType,
  Organization,
  OrganizationMember,
  UserOrganization,
} from "@/types/organization";
import { UserRole } from "@/types/user";
import { DeleteRequestResponse, PatchRequestResponse } from "@/types/utils";

export async function getUserOrgs() {
  const res = await AxiosInstance({
    method: "GET",
    url: "/organization/all",
  });

  return res.data as UserOrganization[];
}

export async function patchOrg(orgId: string, data: Partial<Organization>) {
  console.log(data);

  const res = await AxiosInstance({
    method: "PATCH",
    url: `/organization/update/${orgId}`,
    data,
  });

  return res.data as PatchRequestResponse;
}

export async function getOrgMembers(orgId: string) {
  const res = await AxiosInstance({
    method: "GET",
    url: `/organization/members/${orgId}`,
  });

  return res.data as OrganizationMember[];
}

export async function addMember(orgId: string, data: AddMemberType) {
  const res = await AxiosInstance({
    method: "POST",
    url: `/organization/add-member/${orgId}`,
    data,
  });

  return res.data as OrganizationMember;
}

export async function removeMember(orgId: string, userId: string) {
  const res = await AxiosInstance({
    method: "DELETE",
    url: `/organization/remove-member/${orgId}/${userId}`,
  });

  return res.data as DeleteRequestResponse;
}

export async function updateMember(
  orgId: string,
  userId: string,
  role: UserRole,
) {
  const res = await AxiosInstance({
    method: "PATCH",
    url: `/organization/update-member/${orgId}/${userId}`,
    data: {
      role: role,
    },
  });

  return res.data as PatchRequestResponse;
}
