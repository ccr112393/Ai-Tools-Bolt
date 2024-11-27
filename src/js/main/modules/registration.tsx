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
import { useState } from "react";

function Registration() {
  const componentWidth = "size-1700";
  const [componentValues, setComponentValues] = useState({});
  const [unit, setUnit] = useState("inch");

  const handleInputChange = (e: any) => {
    setComponentValues({
      ...componentValues,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <>
      <Flex
        direction={"row"}
        alignItems={"center"}
        justifyContent={"space-between"}
        alignContent={"center"}
      >
        <Heading level={3}>Setup</Heading>
        <PreferencesPopover
          options={[
            ["Unit Type", <UnitPicker onSelectionChange={() => setUnit} />],
          ]}
        />
      </Flex>

      <Grid
        areas={["label field"]}
        gap={"size-100"}
        alignItems={"center"}
        maxWidth={"size-4600"}
      >
        <Text>Layer Name</Text>
        <TextField
          name="layerName"
          defaultValue="Registration"
          width={componentWidth}
          onChange={handleInputChange}
        />
        <Text>Diameter</Text>
        <UnitField
          name="diameter"
          defaultValue={0.25}
          unit="inch"
          width={componentWidth}
          onChange={handleInputChange}
        />
        <Text>Edge Offset</Text>
        <UnitField
          name="edgeOffset"
          defaultValue={0.5}
          unit="inch"
          width={componentWidth}
          onChange={handleInputChange}
        />
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
            <Checkbox
              defaultSelected
              gridColumn={"1 / -1"}
              onChange={handleInputChange}
            >
              Primary Marks
            </Checkbox>

            <Checkbox defaultSelected onChange={handleInputChange}>
              Orientation Marks
            </Checkbox>
            <Picker
              defaultSelectedKey={"top-left"}
              gridColumn={"field"}
              width={componentWidth}
              onSelectionChange={handleInputChange}
            >
              <Item key={"top-left"}>Top Left</Item>
              <Item key={"top-right"}>Top Right</Item>
              <Item key={"bottom-left"}>Bottom Left</Item>
              <Item key={"bottom-right"}>Bottom Right</Item>
            </Picker>
            <Checkbox onChange={handleInputChange} gridColumn={"1 / -1"}>
              Center Marks
            </Checkbox>
            <Checkbox onChange={handleInputChange}>Specified Distance</Checkbox>
            <UnitField
              defaultValue={24}
              unit="inch"
              gridColumn={"field"}
              width={componentWidth}
              onChange={handleInputChange}
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
        <Button variant="primary" onPress={() => console.log(componentValues)}>
          Apply
        </Button>
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
