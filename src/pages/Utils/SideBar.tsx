import { Antenna, AreaChart, PlugZap, Send, Settings } from "lucide-react";
import { Link } from "react-router-dom";

import Logo from "@/assets/Logo";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const SideBar = () => {
  return (
    <aside className="fixed inset-y-0 left-0 z-50 w-14 flex-col border-r bg-background flex">
      <nav className="flex flex-col items-center gap-4 px-2 py-5">
        <Link
          to="/"
          className="group flex h-9 w-9 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:h-8 md:w-8 md:text-base"
        >
          <Logo className="w-8 h-8 text-secondary" />
          <span className="sr-only">webHook-Play</span>
        </Link>
        <Tooltip>
          <TooltipTrigger asChild>
            <Link
              to="/"
              className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
            >
              <AreaChart className="h-5 w-5" />
              <span className="sr-only">Metric</span>
            </Link>
          </TooltipTrigger>
          <TooltipContent side="right">Metric</TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger asChild>
            <Link
              to="/"
              className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
            >
              <PlugZap className="h-5 w-5" />
              <span className="sr-only">Connections</span>
            </Link>
          </TooltipTrigger>
          <TooltipContent side="right">Connections</TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger asChild>
            <Link
              to="/"
              className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
            >
              <Antenna className="h-5 w-5" />
              <span className="sr-only">Requests</span>
            </Link>
          </TooltipTrigger>
          <TooltipContent side="right">Requests</TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger asChild>
            <Link
              to="/"
              className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
            >
              <Send className="h-5 w-5" />
              <span className="sr-only">Attempts</span>
            </Link>
          </TooltipTrigger>
          <TooltipContent side="right">Attempts</TooltipContent>
        </Tooltip>
      </nav>
      <nav className="mt-auto flex flex-col items-center gap-4 px-2 py-5">
        <Tooltip>
          <TooltipTrigger asChild>
            <Link
              to="/settings"
              className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
            >
              <Settings className="h-5 w-5" />
              <span className="sr-only">Settings</span>
            </Link>
          </TooltipTrigger>
          <TooltipContent side="right">Settings</TooltipContent>
        </Tooltip>
      </nav>
    </aside>
  );
};

export default SideBar;
