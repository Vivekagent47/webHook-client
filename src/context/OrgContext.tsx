import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { toast } from "sonner";

import apis from "@/apis";
import { AuthContext } from "@/context/AuthContext";
import { UserOrganization } from "@/types/organization";

const useOrgStore = () => {
  const { orgId, isLogged } = useContext(AuthContext);
  const [userOrgs, setUserOrgs] = useState<UserOrganization[]>([]);
  const activeOrg = useMemo(() => {
    return userOrgs.find((org) => org.id === orgId);
  }, [orgId, userOrgs]);

  async function getUserOrgs() {
    try {
      const data = await apis.org.getUserOrgs();
      setUserOrgs(data);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      toast.error("Unable to fetch organizations.", {
        description: err?.message,
      });
    }
  }

  useEffect(() => {
    if (isLogged) {
      getUserOrgs();
    }
  }, [isLogged]);

  return {
    activeOrg,
    userOrgs,
    setUserOrgs,
  };
};

type OrgStoreType = ReturnType<typeof useOrgStore>;

export const OrganizationContext = createContext({} as OrgStoreType);
export const OrganizationProvider = ({ children }: { children: ReactNode }) => {
  const store = useOrgStore();
  return (
    <OrganizationContext.Provider value={store}>
      {children}
    </OrganizationContext.Provider>
  );
};
