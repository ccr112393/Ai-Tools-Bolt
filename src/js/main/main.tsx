import {
  darkTheme,
  defaultTheme,
  Flex,
  Item,
  lightTheme,
  Provider,
  TabList,
  TabPanels,
  Tabs,
  View,
} from "@adobe/react-spectrum";
import { createElement, useEffect } from "react";
import { MainModule } from "./modules/main-module";
import { RegistrationModule } from "./modules/registration";
import { SignagentModule } from "./modules/signagent";
import { LaserModule } from "./modules/laser";
import { DeveloperModule } from "./modules/dev";

const modules = [RegistrationModule, DeveloperModule];

const TabModules = () => {
  return (
    <Tabs items={modules} density="compact">
      <TabList>{(item: MainModule) => <Item>{item.name}</Item>}</TabList>
      <TabPanels>
        {(item: MainModule) => <Item>{createElement(item.component)}</Item>}
      </TabPanels>
    </Tabs>
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
          <TabModules />
        </Flex>
      </View>
    </Provider>
  );
};
export default Main;
