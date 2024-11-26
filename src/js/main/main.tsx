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
      <style>{`
        html, body, #root{
          margin: 0;
          padding: 0;
          height: 100%;
          overflow: hidden;
        }
      `}</style>

      <View
        height="100%"
        backgroundColor="gray-200"
        padding={"15px"}
        paddingTop={"10px"}
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
