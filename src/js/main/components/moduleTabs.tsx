import { ActionGroup, Item, Text, View } from "@adobe/react-spectrum";
import { useState, Key, createElement } from "react";
import { ModuleType } from "../modules/moduleInterface";
import { RegistrationModule } from "../modules/registrationModule";
import { RenameModule } from "../modules/renameModule";
import { SignAgentModule } from "../modules/signagentModule";

const modules = [RegistrationModule, RenameModule, SignAgentModule];

export const ModuleTabs = () => {
  const [selectedTab, setSelectedTab] = useState<string>("reg");

  const handleTabChange = (key: Key) => {
    setSelectedTab(key.toString());
  };

  return (
    <>
      <ActionGroup
        items={modules}
        selectionMode="single"
        onAction={handleTabChange}
        defaultSelectedKeys={["reg"]}
        selectedKeys={[selectedTab]}
        buttonLabelBehavior="hide"
      >
        {(item: ModuleType) => (
          <Item key={item.key}>
            {item.icon}
            <Text>{item.name}</Text>
          </Item>
        )}
      </ActionGroup>
      <View>
        {modules.map((item: ModuleType) => (
          <View key={item.key} isHidden={selectedTab !== item.key}>
            {createElement(item.component)}
          </View>
        ))}
      </View>
    </>
  );
};
