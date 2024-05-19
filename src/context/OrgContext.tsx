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
import { errorToast } from "@/lib/error";
import {
  AddMemberType,
  Organization,
  OrganizationMember,
  UserOrganization,
} from "@/types/organization";

const useOrgStore = () => {
  const { orgId, isLogged } = useContext(AuthContext);
  const [userOrgs, setUserOrgs] = useState<UserOrganization[]>([]);
  const [teamMembers, setTeamMembers] = useState<OrganizationMember[]>([]);

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

  async function getOrgMembers() {
    try {
      const data = await apis.org.getOrgMembers(orgId);
      setTeamMembers(data);
    } catch (err) {
      errorToast("Unable to fetch organization members.", err);
    }
  }

  async function addMember(newMember: AddMemberType) {
    const data = await apis.org.addMember(orgId, newMember);
    setTeamMembers((prev) => [...prev, data]);
  }

  async function removeMember(userId: string) {
    try {
      await apis.org.removeMember(orgId, userId);
      setTeamMembers((prev) => prev.filter((member) => member.id !== userId));
    } catch (err) {
      errorToast("Unable to remove member.", err);
    }
  }

  useEffect(() => {
    if (isLogged) {
      getUserOrgs();
      getOrgMembers();
    }
  }, [isLogged]);

  return {
    activeOrg,
    userOrgs,
    setUserOrgs,
    updateOrg,
    teamMembers,
    addMember,
    removeMember,
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
