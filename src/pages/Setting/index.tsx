import { useState } from "react";

import { cn } from "@/lib/utils";
import OrgSettings from "@/pages/Setting/OrgSettings";

const SETTING_LIST = {
  organization: <OrgSettings />,
  user: <div>User Settings</div>,
};

type SettingKey = keyof typeof SETTING_LIST;

export default function Setting() {
  const [selectedSetting, setSelectedSetting] =
    useState<SettingKey>("organization");

  return (
    <main className="flex flex-1 flex-col gap-4 bg-muted/40 p-4 md:gap-8 md:px-10">
      <div className="mx-auto grid w-full max-w-6xl items-start gap-6 md:grid-cols-[180px_1fr] lg:grid-cols-[250px_1fr]">
        <nav className="grid gap-4 text-sm text-muted-foreground">
          {(Object.keys(SETTING_LIST) as SettingKey[]).map((setting) => (
            <span
              key={setting}
              onClick={() => setSelectedSetting(setting)}
              className={cn("cursor-pointer capitalize", {
                "font-semibold text-primary": selectedSetting === setting,
              })}
            >
              {setting}
            </span>
          ))}
        </nav>
        {SETTING_LIST[selectedSetting]}
      </div>
    </main>
  );
}
