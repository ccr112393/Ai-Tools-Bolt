import {
  Disclosure,
  DisclosurePanel,
  DisclosureTitle,
  Flex,
  Form,
  Heading,
  Icon,
  TextField,
} from "@adobe/react-spectrum";

import { PreferencesPopover, UnitField, UnitPicker } from "../components/index";
import { ModuleType } from "./moduleType";

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

export const LaserIcon = (
  <Icon>
    <svg width=".25in" height=".25in" viewBox="0 0 18 18">
      <circle cx="9" cy="9" r="3.9" />
      <path
        d="M8.1,0.2v2.5C8.1,2.9,8.2,3,8.4,3h1.3c0.1,0,0.2-0.1,0.2-0.2V0.2C9.9,0.1,9.8,0,9.7,0H8.4
	C8.2,0,8.1,0.1,8.1,0.2z"
      />
      <path
        d="M8.1,15.2v2.5c0,0.1,0.1,0.2,0.2,0.2h1.3c0.1,0,0.2-0.1,0.2-0.2v-2.5c0-0.1-0.1-0.2-0.2-0.2H8.4
	C8.2,15,8.1,15.1,8.1,15.2z"
      />
      <path
        d="M0,8.4v1.3c0,0.1,0.1,0.2,0.2,0.2h2.5C2.9,9.9,3,9.8,3,9.7V8.4c0-0.1-0.1-0.2-0.2-0.2H0.2
	C0.1,8.1,0,8.2,0,8.4z"
      />
      <path
        d="M15,8.4v1.3c0,0.1,0.1,0.2,0.2,0.2h2.5c0.1,0,0.2-0.1,0.2-0.2V8.4c0-0.1-0.1-0.2-0.2-0.2h-2.5
	C15.1,8.1,15,8.2,15,8.4z"
      />
      <path
        d="M13,4.1L13.9,5c0.1,0.1,0.3,0.1,0.4,0L16,3.3c0.1-0.1,0.1-0.3,0-0.4L15.1,2c-0.1-0.1-0.3-0.1-0.4,0L13,3.8
	C12.9,3.9,12.9,4,13,4.1z"
      />
      <path
        d="M2,15.1L2.9,16c0.1,0.1,0.3,0.1,0.4,0L5,14.3c0.1-0.1,0.1-0.3,0-0.4L4.1,13c-0.1-0.1-0.3-0.1-0.4,0L2,14.8
	C1.9,14.9,1.9,15,2,15.1z"
      />
      <path
        d="M2,3.3L3.7,5C3.8,5.1,4,5.1,4.1,5L5,4.1C5.1,4,5.1,3.8,5,3.7L3.3,2C3.2,1.9,3,1.9,2.9,2L2,2.9
	C1.9,3,1.9,3.2,2,3.3z"
      />
      <path
        d="M13,14.2l1.8,1.8c0.1,0.1,0.3,0.1,0.4,0l0.9-0.9c0.1-0.1,0.1-0.3,0-0.4L14.2,13c-0.1-0.1-0.3-0.1-0.4,0
	L13,13.9C12.9,14,12.9,14.1,13,14.2z"
      />
    </svg>
  </Icon>
);

export default Laser;

export const LaserModule: ModuleType = {
  key: "lsr",
  name: "Laser Setup",
  component: Laser,
  icon: LaserIcon,
};
