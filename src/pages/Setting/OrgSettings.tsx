import { Loader2 } from "lucide-react";
import { useContext, useEffect, useMemo, useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { OrganizationContext } from "@/context/OrgContext";

function OrgSettings() {
  const { activeOrg, updateOrg } = useContext(OrganizationContext);
  const [orgName, setOrgName] = useState(activeOrg?.name);
  const [loading, setLoading] = useState(false);

  const canSave = useMemo(() => {
    return orgName && orgName !== activeOrg?.name;
  }, [orgName, activeOrg]);

  const handleSave = () => {
    if (!orgName || !activeOrg || orgName === activeOrg?.name) {
      return;
    }

    setLoading(true);
    updateOrg(activeOrg.id, { name: orgName }).finally(() => {
      setLoading(false);
    });
  };

  useEffect(() => {
    setOrgName(activeOrg?.name);
  }, [activeOrg]);

  return (
    <div className="grid gap-6">
      <Card>
        <CardHeader>
          <CardTitle>Organization Name</CardTitle>
          <CardDescription>
            Used to identify your organization name in the marketplace.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form>
            <Input
              value={orgName}
              onChange={(e) => setOrgName(e.target.value)}
              placeholder="Enter Organization name"
            />
          </form>
        </CardContent>
        <CardFooter className="border-t px-6 py-4">
          <Button disabled={!canSave} onClick={handleSave}>
            {loading ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              "Save"
            )}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}

export default OrgSettings;
