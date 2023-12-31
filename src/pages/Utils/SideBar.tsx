import { useOnClickOutside } from "@/lib/useOnClickOutside";
import { cn } from "@/lib/utils";
import { useRef } from "react";
import { Link } from "react-router-dom";

type SideBarProps = {
  openSidebar: boolean;
  setOpenSidebar: (value: boolean) => void;
};

const sibarList = [
  {
    id: "dashboard",
    name: "Dashboard",
    path: "/",
  },
  {
    id: "source",
    name: "Source",
    path: "/source",
  },
  {
    id: "destination",
    name: "Destination",
    path: "/destination",
  },
  {
    id: "flows",
    name: "Flows",
    path: "/flows",
  },
  {
    id: "events",
    name: "Events",
    path: "/events",
  },
  {
    id: "request",
    name: "Request",
    path: "/request",
  },
];

const SideBar = ({ openSidebar, setOpenSidebar }: SideBarProps) => {
  const sidebarRef = useRef<HTMLDivElement>(null);
  useOnClickOutside(sidebarRef, () => setOpenSidebar(false));

  return (
    <div
      ref={sidebarRef}
      className={cn(
        "z-40 w-64 pt-16 fixed h-screen transition-transform bg-white border-r border-gray-200 lg:translate-x-0 dark:bg-gray-800 dark:border-gray-700",
        openSidebar ? "translate-x-0" : "-translate-x-full",
      )}
    >
      <div className="h-full p-4 overflow-y-auto bg-white dark:bg-gray-800">
        <ul className="space-y-2 font-medium">
          {sibarList.map((item) => {
            return (
              <li key={item.id}>
                <Link
                  to={item.path}
                  className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                >
                  <span className="ms-3">{item.name}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default SideBar;
