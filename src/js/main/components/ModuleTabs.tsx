import { ActionGroup, Flex, Item, Text, View } from "@adobe/react-spectrum";
import { Key, createElement, useState } from "react";
import { DeveloperMenu, EnableDeveloperMode, ReloadButton } from "./index";
import {
  ModuleType,
  RegistrationModule,
  RenameModule,
  SignAgentModule,
} from "../modules";

export const ModuleTabs = () => {
  const EnabledModules: ModuleType[] = [
    RegistrationModule,
    RenameModule,
    SignAgentModule,
  ];
  const [selectedTab, setSelectedTab] = useState<string>("reg");

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
      <View>
        {EnabledModules.map((item) => (
          <View key={item.key} isHidden={selectedTab !== item.key}>
            {createElement(item.component)}
          </View>
        ))}
      </View>
    </>
  );
};
