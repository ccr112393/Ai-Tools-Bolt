import {
  ToggleButtonGroup,
  ToggleButton,
  ActionButton,
  Text,
  Tooltip,
  TooltipTrigger,
} from "@react-spectrum/s2";

import { style } from "@react-spectrum/s2/style" with { type: "macro" };
import { Icon } from "@adobe/react-spectrum";
import { Key, useMemo, useState } from "react";
import { Modules } from "./Modules";
import { AboutModule } from "./About";
import { componentGap } from "../utils";
import { ReloadButton } from "../components";
import { EnableDeveloperMode, DeveloperBadge } from "./Developer/DeveloperMode";

export const ModuleTabs = () => {
  const [selectedTab, setSelectedTab] = useState<string>(Modules[0].key);
  const memoizedModules = useMemo(() => {
    return Modules.map((item) => (
      <div key={item.key}
        hidden={selectedTab !== item.key}>
        <item.component />
      </div>
    ));
  }, [selectedTab]);

  const handleTabChange = (key: Key) => {
    setSelectedTab(key.toString());
  };

  return (
    <>
      <div
        className={style({
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between"
        })}>
        <ToggleButtonGroup
          selectionMode="single"
          defaultSelectedKeys={[Modules[0].key]}
          selectedKeys={[selectedTab]}>
          {Modules.filter(
            (item) => item.key !== "abt" && item.key !== "dev"
          ).map((item) => (
            <ToggleButton key={item.key} id={item.key} onPress={() => handleTabChange(item.key)}>
              {item.icon}
              <Text>{item.name}</Text>
            </ToggleButton>
          ))}
        </ToggleButtonGroup>

        <div
          className={style({
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            gap: 2,
          })}>
          <ReloadButton />
          <TooltipTrigger>
            <ActionButton isQuiet onPress={() => handleTabChange("abt")}>
              {AboutModule.icon ? <Icon>{AboutModule.icon}</Icon> : <></>}
            </ActionButton>
            <Tooltip>About</Tooltip>
          </TooltipTrigger>
          {EnableDeveloperMode && <DeveloperBadge />}
        </div>
      </div>
      {memoizedModules}
    </>
  );
};
