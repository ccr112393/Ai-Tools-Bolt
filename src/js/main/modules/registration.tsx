import {
  ActionButton,
  ActionGroup,
  Button,
  Flex,
  Form,
  Grid,
  Heading,
  Item,
  Picker,
  Text,
  TextField,
  Disclosure,
  DisclosureTitle,
  DisclosurePanel,
  Checkbox,
  Header,
} from "@adobe/react-spectrum";

import PreferencesPopover from "../components/PreferencesPopover";
import UnitField from "../components/UnitField";
import UnitPicker from "../components/UnitPicker";
import { MainModule } from "./mainModule";
import RotateCCWBold from "@spectrum-icons/workflow/RotateCCWBold";
import SaveFloppy from "@spectrum-icons/workflow/SaveFloppy";

const componentWidth = "size-1700";

function Registration() {
  return (
    <>
      <Flex
        direction={"row"}
        alignItems={"center"}
        justifyContent={"space-between"}
        alignContent={"center"}
      >
        <Heading level={3}>Setup</Heading>
        <PreferencesPopover options={[["Unit Type", <UnitPicker />]]} />
      </Flex>

      <Grid
        areas={["label field"]}
        gap={"size-100"}
        alignItems={"center"}
        maxWidth={"size-4600"}
      >
        <Text>Layer Name</Text>
        <TextField defaultValue="Registration" width={componentWidth} />
        <Text>Diameter</Text>
        <UnitField defaultValue={0.25} unit="inch" width={componentWidth} />
        <Text>Edge Offset</Text>
        <UnitField defaultValue={0.5} unit="inch" width={componentWidth} />
      </Grid>

      <Disclosure marginTop={"size-100"} isQuiet>
        <DisclosureTitle>
          <Heading level={5} margin={0}>
            Placement Options
          </Heading>
        </DisclosureTitle>
        <DisclosurePanel>
          <Grid
            areas={["label field"]}
            alignItems={"center"}
            maxWidth={"size-4600"}
          >
            <Checkbox defaultSelected gridColumn={"1 / -1"}>
              Primary Marks
            </Checkbox>

            <Checkbox defaultSelected>Orientation Marks</Checkbox>
            <Picker
              defaultSelectedKey={"top-left"}
              gridColumn={"field"}
              width={componentWidth}
            >
              <Item key={"top-left"}>Top Left</Item>
              <Item key={"top-right"}>Top Right</Item>
              <Item key={"bottom-left"}>Bottom Left</Item>
              <Item key={"bottom-right"}>Bottom Right</Item>
            </Picker>
            <Checkbox gridColumn={"1 / -1"}>Center Marks</Checkbox>
            <Checkbox>Specified Distance</Checkbox>
            <UnitField
              defaultValue={24}
              unit="inch"
              gridColumn={"field"}
              width={componentWidth}
            />
          </Grid>
        </DisclosurePanel>
      </Disclosure>
      <Flex justifyContent={"space-between"} marginTop={"size-200"}>
        <ActionGroup>
          <Item key="reset">
            <RotateCCWBold size="S" />
          </Item>
          <Item key="save">
            <SaveFloppy size="S" />
          </Item>
        </ActionGroup>
        <Button variant="primary">Apply</Button>
      </Flex>
    </>
  );
}

export default Registration;

export const RegistrationModule: MainModule = {
  key: "reg",
  name: "Registration",
  component: Registration,
};
