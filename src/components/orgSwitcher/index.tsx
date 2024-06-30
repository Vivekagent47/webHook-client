import { OrganizationContext } from "@/context/OrgContext";
import { useContext } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import { AuthContext } from "@/context/AuthContext";

function OrgSwitcher() {
  const { userOrgs, activeOrg } = useContext(OrganizationContext);
  const { changeOrg } = useContext(AuthContext);

  const chnageOrgAndReload = async (orgId: string) => {
    // chnage org
    await changeOrg(orgId);
    // refech the complete website
    window.location.reload();
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="default">
          Switch Org
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-60">
        {userOrgs.map((org) => (
          <DropdownMenuItem
            key={org.id}
            className={cn({
              "bg-blue-50": org.id === activeOrg?.id,
            })}
            onClick={() => chnageOrgAndReload(org.id)}
          >
            <p
              className="text-sm font-normal text-gray-800 truncate cursor-default dark:text-gray-300"
              role="none"
            >
              {org.name}
            </p>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default OrgSwitcher;
