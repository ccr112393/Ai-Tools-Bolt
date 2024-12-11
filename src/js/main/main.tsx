import {
  darkTheme,
  Flex,
  Item,
  Provider,
  TabList,
  TabPanels,
  Tabs,
  Text,
  View
} from "@adobe/react-spectrum";
import { ToastContainer } from "@react-spectrum/toast";
import { createElement } from "react";
import { LaserModule, ModuleType, RegistrationModule } from "./modules/index";

const modules = [RegistrationModule, LaserModule];

const TabModules = () => {
  return (
    <Tabs items={modules} density="compact">
      <TabList>
        {(item: ModuleType) => (
          <Item key={item.name}>
            {/* {item.icon} */}
            <Text>{item.name}</Text>
          </Item>
        )}
      </TabList>
      <TabPanels>
        {(item: ModuleType) => (
          <Item key={item.name}>{createElement(item.component)}</Item>
        )}
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
        <ToastContainer />
      </View>
    </Provider>
  );
};
export default Main;
