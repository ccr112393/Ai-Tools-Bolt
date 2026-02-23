import {
  ActionButton,
  ActionGroup,
  Flex,
  Icon,
  Item,
  Text,
  Tooltip,
  TooltipTrigger,
  View,
} from "@adobe/react-spectrum";
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
      <View key={item.key} isHidden={selectedTab !== item.key}>
        <item.component />
      </View>
    ));
  }, [selectedTab]);

  const handleTabChange = (key: Key) => {
    setSelectedTab(key.toString());
  };

  return (
    <>
      <Flex direction={"row"} justifyContent={"space-between"}>
        <ActionGroup
          items={Modules.filter(
            (item) => item.key !== "abt" && item.key !== "dev"
          )}
          selectionMode="single"
          onAction={handleTabChange}
          defaultSelectedKeys={[Modules[0].key]}
          selectedKeys={[selectedTab]}
          buttonLabelBehavior="hide"
        >
          {(item) => (
            <Item key={item.key}>
              {item.icon}
              <Text>{item.name}</Text>
            </Item>
          )}
        </ActionGroup>

        <Flex direction={"row"} alignItems={"center"} gap={componentGap}>
          <ReloadButton />
          <TooltipTrigger>
            <ActionButton isQuiet onPress={() => handleTabChange("abt")}>
              {AboutModule.icon ? <Icon>{AboutModule.icon}</Icon> : <></>}
            </ActionButton>
            <Tooltip>About</Tooltip>
          </TooltipTrigger>
          {EnableDeveloperMode && <DeveloperBadge />}
        </Flex>
      </Flex>
      {memoizedModules}
    </>
  );
};
