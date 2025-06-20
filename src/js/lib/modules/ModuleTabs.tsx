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
import {
  DeveloperMenu,
  EnableDeveloperMode,
  EnabledModules,
  ReloadButton,
} from ".";
import { AboutModule } from "./About";
import { componentGap } from "../utils";

export const ModuleTabs = () => {
  const [selectedTab, setSelectedTab] = useState<string>(EnabledModules[0].key);
  const memoizedModules = useMemo(() => {
    return EnabledModules.map((item) => (
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
          items={EnabledModules.filter(
            (item) => item.key !== "abt" && item.key !== "dev"
          )}
          selectionMode="single"
          onAction={handleTabChange}
          defaultSelectedKeys={["reg"]}
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

        <Flex direction={"row"} alignItems={"end"} gap={componentGap}>
          {EnableDeveloperMode ? <DeveloperMenu /> : <ReloadButton />}
          <TooltipTrigger>
            <ActionButton isQuiet onPress={() => handleTabChange("abt")}>
              {AboutModule.icon ? <Icon>{AboutModule.icon}</Icon> : <></>}
            </ActionButton>
            <Tooltip>About</Tooltip>
          </TooltipTrigger>
        </Flex>
      </Flex>
      {memoizedModules}
    </>
  );
};
