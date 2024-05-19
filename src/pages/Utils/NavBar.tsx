import { useContext } from "react";
import { Link } from "react-router-dom";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { AuthContext } from "@/context/AuthContext";
import Breadcrumbs from "./Breadcrumbs";

const NavBar = () => {
  const { logout, user } = useContext(AuthContext);

  return (
    <header className="sticky top-0 z-40 flex h-14 items-center gap-4 border-b bg-white py-2 px-4 sm:h-auto sm:px-6">
      <Breadcrumbs />
      <div className="relative ml-auto grow-0">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              className="overflow-hidden rounded-full"
            >
              {user.firstName[0]}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className=" w-60">
            <DropdownMenuLabel>
              <p
                className="text-sm text-gray-900 truncate dark:text-white cursor-default"
                role="none"
              >
                {`${user.firstName} ${user.lastName}`}
              </p>
              <p
                className="text-sm font-medium text-gray-600 truncate cursor-default dark:text-gray-300"
                role="none"
              >
                {user.email}
              </p>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <Link to="/settings">
              <DropdownMenuItem>Settings</DropdownMenuItem>
            </Link>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={logout}>Logout</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
};

export default NavBar;
