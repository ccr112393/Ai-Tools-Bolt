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
import { createElement } from "react";
import { MainModule } from "./modules/mainModule";
import { RegistrationModule } from "./modules/registration";
import { SignagentModule } from "./modules/signagent";
import { LaserModule } from "./modules/laser";

const modules = [RegistrationModule, SignagentModule, LaserModule];

const Main = () => {
  return (
    <Provider
      theme={darkTheme}
      colorScheme="light"
      height={"100%"}
      scale="medium"
    >
      <View
        padding={"calc(single-line-height / 2"}
        paddingTop={"calc(single-line-height / 2.5"}
      >
        <Flex
          direction={"column"}
          maxWidth={"static-size-5000"}
          margin={"auto"}
        >
          <Tabs items={modules} density="compact">
            <TabList>{(item: MainModule) => <Item>{item.name}</Item>}</TabList>
            <TabPanels>
              {(item: MainModule) => (
                <Item>{createElement(item.component)}</Item>
              )}
            </TabPanels>
          </Tabs>
        </Flex>
      </View>
    </Provider>
  );
};
export default Main;
