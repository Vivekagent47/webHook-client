import { useContext } from "react";
import { Link } from "react-router-dom";

import Logo from "@/assets/Logo";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { AuthContext } from "@/context/AuthContext";
import { OrganizationContext } from "@/context/OrgContext";
import { getClampTextSx } from "@/lib/utils";

type NavBarProps = {
  setOpenSidebar: (value: boolean) => void;
};

const NavBar = ({ setOpenSidebar }: NavBarProps) => {
  const { logout } = useContext(AuthContext);
  const { userOrgs } = useContext(OrganizationContext);

  return (
    <nav className="z-50 w-full fixed bg-white border-b border-gray-200 dark:bg-gray-800 dark:border-gray-700">
      <div className="px-3 py-3 lg:px-5 lg:pl-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center justify-start rtl:justify-end">
            <Button
              variant="ghost"
              className="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg lg:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
              onClick={() => setOpenSidebar(true)}
            >
              <svg
                className="w-6 h-6"
                aria-hidden="true"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  clipRule="evenodd"
                  fillRule="evenodd"
                  d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
                ></path>
              </svg>
            </Button>
            <Link to="/" className="flex ms-2 md:me-24 gap-2">
              <Logo className="w-8 h-8 text-gray-700 dark:text-white" />
              <span className="self-center text-base text-indigo-700 font-semibold lg:text-xl whitespace-nowrap dark:text-white">
                webHook-Play
              </span>
            </Link>
          </div>
          <div className="flex items-center gap-4">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline">Select Team</Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56">
                <DropdownMenuGroup>
                  {userOrgs.map((item) => {
                    return (
                      <DropdownMenuItem
                        key={item.id}
                        title={item.name}
                        style={getClampTextSx(1)}
                        className="cursor-pointer"
                      >
                        {item.name}
                      </DropdownMenuItem>
                    );
                  })}
                </DropdownMenuGroup>
              </DropdownMenuContent>
            </DropdownMenu>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="flex p-0.5 text-s rounded-full focus:outline-none focus:ring-none"
                >
                  <span className="w-8 h-8 border-gray-800 border-2 rounded-full flex items-center justify-center">
                    V
                  </span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56">
                <DropdownMenuLabel>
                  <p
                    className="text-sm text-gray-900 dark:text-white"
                    role="none"
                  >
                    Neil Sims
                  </p>
                  <p
                    className="text-sm font-medium text-gray-900 truncate dark:text-gray-300"
                    role="none"
                  >
                    neil.sims@flowbite.com
                  </p>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                  <DropdownMenuItem className="cursor-pointer">
                    Profile
                  </DropdownMenuItem>
                  <DropdownMenuItem className="cursor-pointer">
                    Team Details
                  </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  className="cursor-pointer"
                  onClick={() => {
                    logout();
                  }}
                >
                  Log out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
