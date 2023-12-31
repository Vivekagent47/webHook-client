import { ReactNode, createContext, useContext, useState } from "react";

import { AuthContext } from "@/context/AuthContext";
import { Organization } from "@/types/organization";

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
