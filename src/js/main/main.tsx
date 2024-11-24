import {
  ActionButton,
  Content,
  defaultTheme,
  Dialog,
  DialogTrigger,
  Divider,
  Flex,
  Form,
  Grid,
  Heading,
  Item,
  Provider,
  TabList,
  TabPanels,
  Tabs,
  Text,
  TextField,
  View,
} from "@adobe/react-spectrum";
import {
  Disclosure,
  DisclosureHeader,
  DisclosurePanel,
} from "@react-spectrum/accordion";
import Settings from "@spectrum-icons/workflow/Settings";
import UnitPicker from "./components/UnitPicker";
import { registrationModule } from "./modules/registration";
import { MainModule } from "./modules/mainModule";
import React, { createElement, Fragment, useState } from "react";

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

const DefaultsPopoverDialog = () => {
  return (
    <DialogTrigger type="popover">
      <ActionButton isQuiet>
        <Settings />
      </ActionButton>
      <Dialog>
        <Heading>Settings</Heading>
        <Divider />
        <Content>
          <Grid areas={["label field"]} gap={"size-100"} alignItems={"center"}>
            <Text>Registration Unit</Text>
            <UnitPicker />
            <Text>Laser Unit</Text>
            <UnitPicker />
          </Grid>
        </Content>
      </Dialog>
    </DialogTrigger>
  );
};
