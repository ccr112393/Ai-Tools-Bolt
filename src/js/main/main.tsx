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
  NumberField,
  SpectrumNumberFieldProps,
  Picker,
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

import { useState } from "react";

const Main = () => {
  // Main States
  const [registrationUnit, setRegistrationUnit] = useState("in");

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
          {/* <Heading level={1}>Ai Tools Bolt</Heading> */}

          <Tabs>
            <Flex gap={"size-100"}>
              <TabList flex="auto">
                <Item key={"reg"}>Registration</Item>
                <Item key={"las"}>Laser</Item>
                <Item key={"ren"}>Rename</Item>
                <Item key={"sat"}>SignAgent™️ Tools</Item>
              </TabList>
              <Content alignSelf={"center"}>
                <DefaultsPopoverDialog />
              </Content>
            </Flex>
            <TabPanels>
              <Item key={"reg"}>
                <TabPanelRegistration />
              </Item>
              <Item key={"las"}>Laser Content</Item>
              <Item key={"ren"}>Rename Content</Item>
              <Item key={"sat"}>SignAgent™️ Tools Content</Item>
            </TabPanels>
          </Tabs>
        </Flex>
      </View>
    </Provider>
  );
};
export default Main;

const TabPanelRegistration = () => {
  return (
    <Flex direction={"column"}>
      <Heading level={2}>Setup</Heading>
      <Form isRequired necessityIndicator="icon">
        <UnitField label="Diameter" defaultValue={0.25} unit="inch" />

        <UnitField label="Distance from Edge" defaultValue={0.5} unit="inch" />

        <TextField label="Layer Name" defaultValue="Registration"></TextField>
      </Form>

      <Disclosure>
        <DisclosureHeader>Options</DisclosureHeader>
        <DisclosurePanel>
          <UnitField />
        </DisclosurePanel>
      </Disclosure>
    </Flex>
  );
};

const UnitList = [
  { key: "in", unit: "inch" },
  { key: "mm", unit: "millimeter" },
  { key: "cm", unit: "centimeter" },
  { key: "ft", unit: "foot" },
  { key: "m", unit: "meter" },
  // TODO: Add Pixels/Points w/ Polyfill?
];

const UnitPicker = () => {
  return (
    <Picker width={"75px"} defaultSelectedKey={"in"} items={UnitList}>
      {(items) => <Item>{items.key}</Item>}
    </Picker>
  );
};

interface UnitFieldProps
  extends Omit<SpectrumNumberFieldProps, "formatOptions"> {
  unit?: string;
}

function withUnitFieldDefaults(WrappedComponent: typeof NumberField) {
  return function UnitField({ unit = "inch", ...props }: UnitFieldProps) {
    const defaultProps: Partial<SpectrumNumberFieldProps> = {
      defaultValue: 3,
      step: 0.125,
    };

    return (
      <WrappedComponent
        {...defaultProps}
        {...props}
        formatOptions={{ style: "unit", unit }}
      />
    );
  };
}

const UnitField = withUnitFieldDefaults(NumberField);

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
