import {
  darkTheme,
  Flex,
  Item,
  Provider,
  TabList,
  TabPanels,
  Tabs,
  View,
} from "@adobe/react-spectrum";
import { createElement } from "react";
import {
  DeveloperModule,
  ModuleType,
  RegistrationModule,
} from "./modules/index";

const modules = [RegistrationModule, DeveloperModule];

const TabModules = () => {
  return (
    <Tabs items={modules} density="compact">
      <TabList>{(item: ModuleType) => <Item>{item.name}</Item>}</TabList>
      <TabPanels>
        {(item: ModuleType) => <Item>{createElement(item.component)}</Item>}
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
