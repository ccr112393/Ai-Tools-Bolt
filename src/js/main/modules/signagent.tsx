import {
  Flex,
  Form,
  Heading,
  TextField,
  Disclosure,
  DisclosureTitle,
  DisclosurePanel,
} from "@adobe/react-spectrum";
import PreferencesPopover from "../components/PreferencesPopover";
import UnitField from "../components/UnitField";
import UnitPicker from "../components/UnitPicker";
import { MainModule } from "./main-module";

function SignAgentTools() {
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
        <DisclosureTitle>Options</DisclosureTitle>
        <DisclosurePanel>
          <UnitField />
        </DisclosurePanel>
      </Disclosure>
    </Flex>
  );
}

export default SignAgentTools;

export const SignagentModule: MainModule = {
  key: "sat",
  name: "SignAgent™️ Tools",
  component: SignAgentTools,
};
