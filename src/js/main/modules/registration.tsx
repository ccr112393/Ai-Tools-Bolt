import { Flex, Form, Heading, TextField } from "@adobe/react-spectrum";
import {
  Disclosure,
  DisclosureHeader,
  DisclosurePanel,
} from "@react-spectrum/accordion";
import PreferencesPopover from "../components/PreferencesPopover";
import UnitField from "../components/UnitField";
import UnitPicker from "../components/UnitPicker";
import { MainModule } from "./mainModule";

function Registration() {
  return (
    <Flex direction={"column"} alignSelf={"center"}>
      <Flex
        direction={"row"}
        alignItems={"center"}
        justifyContent={"space-between"}
      >
        <Heading level={2}>Setup</Heading>
        <PreferencesPopover options={[["Unit Type", <UnitPicker />]]} />
      </Flex>
      <Form
        isRequired
        necessityIndicator="icon"
        labelPosition="side"
        labelAlign="end"
        maxWidth={"size-4600"}
      >
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
}

export const registrationModule: MainModule = {
  key: "reg",
  name: "Registration",
  component: Registration,
};
