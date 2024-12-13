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

export function LaserComponent() {
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
          options={[["Unit Type", <UnitPicker maxWidth={"size-1250"} />]]}
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
