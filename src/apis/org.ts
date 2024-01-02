import AxiosInstance from "@/lib/axios";
import { UserOrganization } from "@/types/organization";

export async function getUserOrgs() {
  const res = await AxiosInstance({
    method: "GET",
    url: "/organization/all",
  });

  return res.data as UserOrganization[];
}
