import { Loader2, Trash2 } from "lucide-react";
import { useContext, useEffect, useMemo, useState } from "react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { AuthContext } from "@/context/AuthContext";
import { OrganizationContext } from "@/context/OrgContext";
import { errorToast } from "@/lib/error";
import { AddMemberType } from "@/types/organization";
import { UserRole } from "@/types/user";

export default function OrgSettings() {
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
          <Input
            type="text"
            value={orgName}
            onChange={(e) => setOrgName(e.target.value)}
            placeholder="Enter Organization name"
          />
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
      <TeamMemberList />
    </div>
  );
}

function TeamMemberList() {
  const { teamMembers, removeMember } = useContext(OrganizationContext);
  const { user } = useContext(AuthContext);
  const [addTeamMember, setAddTeamMember] = useState(false);

  return (
    <>
      <AddTeamMemberForm
        open={addTeamMember}
        close={() => setAddTeamMember(false)}
      />

      <Card>
        <div className="flex justify-between items-center p-6">
          <CardHeader className="p-0">
            <CardTitle>Team Members</CardTitle>
            <CardDescription>
              Add or remove team members from your organization.
            </CardDescription>
          </CardHeader>
          <Button
            variant="default"
            onClick={() => {
              setAddTeamMember(true);
            }}
          >
            Add Member
          </Button>
        </div>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Role</TableHead>
                <TableHead className="w-[100px]"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {teamMembers.map((member) => (
                <TableRow key={member.id}>
                  <TableCell className="truncate">
                    {`${member.firstName} ${member.lastName}`}
                  </TableCell>
                  <TableCell className="truncate">{member.email}</TableCell>
                  <TableCell className="space-x-1.5">
                    {user.email === member.email && (
                      <Badge variant="secondary">You</Badge>
                    )}
                    <Badge variant="secondary" className="capitalize">
                      {member.role}
                    </Badge>
                  </TableCell>
                  <TableCell className="flex justify-end">
                    <Button
                      variant="ghost"
                      onClick={() => removeMember(member.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </>
  );
}

function AddTeamMemberForm({
  open,
  close,
}: {
  open: boolean;
  close: () => void;
}) {
  const { addMember } = useContext(OrganizationContext);
  const [newMember, setNewMember] = useState<AddMemberType>({
    userEmail: "",
    role: UserRole.MEMBER,
  });
  const [loading, setLoading] = useState(false);

  const addNewMember = async () => {
    try {
      setLoading(true);
      await addMember(newMember);
      setNewMember({
        userEmail: "",
        role: UserRole.MEMBER,
      });
      close();
    } catch (err) {
      errorToast("Unable to add member.", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={close}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add Team Member</DialogTitle>
          <DialogDescription>
            Add a new team member to your organization.
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col gap-4 py-4">
          <div className="flex flex-col justify-center items-start gap-2">
            <Label htmlFor="email" className="text-right">
              Email
            </Label>
            <Input
              id="email"
              placeholder="Enter email address"
              type="email"
              value={newMember.userEmail}
              onChange={(e) =>
                setNewMember((prv) => ({ ...prv, userEmail: e.target.value }))
              }
            />
          </div>
          <div className="flex flex-col justify-center items-start gap-2">
            <Label htmlFor="username" className="text-right">
              Role
            </Label>
            <Select
              value={newMember.role}
              onValueChange={(e) => {
                setNewMember((prv) => ({ ...prv, role: e as UserRole }));
              }}
            >
              <SelectTrigger className="capitalize">
                <SelectValue placeholder="Select role" />
              </SelectTrigger>
              <SelectContent>
                {Object.values(UserRole).map((role) => (
                  <SelectItem
                    disabled={role === UserRole.OWNER}
                    key={role}
                    value={role}
                    className="capitalize cursor-pointer"
                  >
                    {role}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Label>
              <span className="text-xs text-muted-foreground">
                Note: There can only be one owner. Thats why you can&apos;t
                select the owner role.
              </span>
            </Label>
          </div>
        </div>
        <DialogFooter>
          <Button
            type="submit"
            disabled={!newMember.userEmail || !newMember.role}
            onClick={addNewMember}
          >
            {loading ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              "Add Member"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
