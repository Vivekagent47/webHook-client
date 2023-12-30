import { ReactNode, createContext, useContext, useState } from "react";

import { Organization } from "@/types/organization";
import { AuthContext } from "./AuthContext";

const useOrgStore = () => {
  const [activeOrg, setActiveOrg] = useState<Organization | null>(null);
  const [userOrgs, setUserOrgs] = useState<Organization[]>([]);
  const { orgId } = useContext(AuthContext);

  console.log(orgId);

  return {
    activeOrg,
    setActiveOrg,
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
