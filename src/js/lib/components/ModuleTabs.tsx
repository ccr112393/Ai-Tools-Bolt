import { ActionGroup, Flex, Item, Text, View } from "@adobe/react-spectrum";
import { Key, useMemo, useState } from "react";
import {
  DeveloperMenu,
  EnableDeveloperMode,
  EnabledModules,
  ReloadButton,
} from "../modules";

export const ModuleTabs = () => {
  console.log("Hello from Main");
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
          items={EnabledModules}
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
        {EnableDeveloperMode ? <DeveloperMenu /> : <ReloadButton />}
      </Flex>
      {memoizedModules}
    </>
  );
};
