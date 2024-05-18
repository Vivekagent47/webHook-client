import AxiosInstance from "@/lib/axios";
import { Organization, UserOrganization } from "@/types/organization";
import { PatchRequestResponse } from "@/types/utils";

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
