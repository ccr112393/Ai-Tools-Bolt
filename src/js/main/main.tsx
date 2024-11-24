import {
  defaultTheme,
  Flex,
  Item,
  Provider,
  TabList,
  TabPanels,
  Tabs,
  View,
} from "@adobe/react-spectrum";
import { createElement } from "react";
import { MainModule } from "./modules/mainModule";
import { registrationModule } from "./modules/registration";

const modules = [registrationModule];

const Main = () => {
  return (
    <Provider theme={defaultTheme} colorScheme="dark" height={"100%"}>
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
        <Flex direction={"column"} gap={"size-100"}>
          <Tabs items={modules}>
            <TabList flex="auto">
              {(item: MainModule) => <Item>{item.name}</Item>}
            </TabList>
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
