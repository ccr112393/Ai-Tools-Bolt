import {
  ActionGroup,
  darkTheme,
  Flex,
  Item,
  Provider,
  Text,
  View,
} from "@adobe/react-spectrum";
import { ToastContainer } from "@react-spectrum/toast";
import { createElement, Key, useState } from "react";
import {
  ModuleType,
  RegistrationModule,
  RenameModule,
  SignAgentModule,
} from "./modules/index";

const modules = [RegistrationModule, RenameModule, SignAgentModule];

const Modules = () => {
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

const Main = () => {
  return (
    // TODO: Enable Theme Switching to match UI - root bg color is set manually
    <Provider theme={darkTheme} colorScheme="light" scale="medium">
      <style>{`
        html, body, #root{
          margin: 0;
          padding: 0;
          height: 100%;
          overflow: auto;
          background-color: #323232;
        }
      `}</style>

      <View
        padding={"calc(single-line-height / 2"}
        paddingTop={"calc(single-line-height / 2.5"}
      >
        <Flex
          direction={"column"}
          maxWidth={"static-size-5000"}
          margin={"auto"}
        >
          <Modules />
        </Flex>
        <ToastContainer />
      </View>
    </Provider>
  );
};
export default Main;
