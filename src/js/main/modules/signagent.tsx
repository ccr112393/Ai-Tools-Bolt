import {
  Disclosure,
  DisclosurePanel,
  DisclosureTitle,
  Flex,
  Form,
  Heading,
  TextField,
} from "@adobe/react-spectrum";
import { PreferencesPopover, UnitField, UnitPicker } from "../components/index";
import { ModuleType } from "./moduleType";

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

export const SignagentModule: ModuleType = {
  key: "sat",
  name: "SignAgent™️ Tools",
  component: SignAgentTools,
};
