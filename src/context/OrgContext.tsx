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
import { Organization, UserOrganization } from "@/types/organization";
import { errorToast } from "@/lib/error";

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
    } catch (err) {
      errorToast("Unable to fetch organizations.", err);
    }
  }

  async function updateOrg(orgId: string, data: Partial<Organization>) {
    try {
      const updatedOrg = await apis.org.patchOrg(orgId, data);
      setUserOrgs((prev) =>
        prev.map((org) => (org.id === orgId ? { ...org, ...data } : org)),
      );

      toast.success(updatedOrg.message);
    } catch (err) {
      errorToast("Unable to update organization.", err);
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
    updateOrg,
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
