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

function Laser() {
  return (
    <Flex direction={"column"} alignSelf={"center"}>
      <Flex
        direction={"row"}
        alignItems={"center"}
        justifyContent={"space-between"}
      >
        <Heading level={2}>SignAgent Tools</Heading>
        <PreferencesPopover
          heading={"Defaults"}
          options={[["Unit Type", <UnitPicker />]]}
        />
      </Flex>
      <Form
        isRequired
        necessityIndicator="icon"
        labelPosition="side"
        labelAlign="end"
        maxWidth={"size-4600"}
      >
        <TextField label="Layer Name" defaultValue="SignAgent"></TextField>
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

export default Laser;

export const LaserModule: MainModule = {
  key: "lsr",
  name: "Laser Setup",
  component: Laser,
};
