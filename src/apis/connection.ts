import AxiosInstance from "@/lib/axios";
import { ConnectionType } from "@/types/connection";

export async function getAllConnections() {
  const res = await AxiosInstance({
    method: "GET",
    url: "/connection",
  });

  return res.data as ConnectionType[];
}
