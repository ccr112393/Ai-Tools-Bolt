import {
  ActionGroup,
  Button,
  Checkbox,
  Disclosure,
  DisclosurePanel,
  DisclosureTitle,
  Flex,
  Grid,
  Heading,
  Item,
  Picker,
  Text,
  TextField,
} from "@adobe/react-spectrum";

import RotateCCWBold from "@spectrum-icons/workflow/RotateCCWBold";
import SaveFloppy from "@spectrum-icons/workflow/SaveFloppy";
import { useState } from "react";
import PreferencesPopover from "../components/PreferencesPopover";
import UnitField from "../components/UnitField";
import UnitPicker from "../components/UnitPicker";
import { MainModule } from "./main-module";
import { evalTS } from "../../lib/utils/bolt";

function Registration() {
  const componentWidth = "size-1700";
  const [unit, setUnit] = useState("inch");
  const [layerName, setLayerName] = useState("Registration");
  const [diameter, setDiameter] = useState(0.25);
  const [edgeOffset, setEdgeOffset] = useState(0.5);
  const [marksPrimary, setMarksPrimary] = useState(true);
  const [marksOrientation, setMarksOrientation] = useState(true);
  const [marksOrientationLocation, setMarksOrientationLocation] =
    useState("top-left");
  const [marksCenter, setMarksCenter] = useState(false);
  const [marksDistance, setMarksDistance] = useState(false);
  const [marksDistanceValue, setMarksDistanceValue] = useState(24);

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
          value={layerName}
          onChange={setLayerName}
          width={componentWidth}
        />
        <Text>Diameter</Text>
        <UnitField
          name="diameter"
          value={diameter}
          unit={unit}
          onChange={setDiameter}
          width={componentWidth}
        />
        <Text>Edge Offset</Text>
        <UnitField
          name="edgeOffset"
          value={edgeOffset}
          unit={unit}
          onChange={setEdgeOffset}
          width={componentWidth}
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
              name="marksPrimary"
              isSelected={marksPrimary}
              onChange={setMarksPrimary}
              gridColumn={"1 / -1"} // Use both columns
            >
              Primary Marks
            </Checkbox>

            <Checkbox
              name="marksOrientation"
              isSelected={marksOrientation}
              onChange={setMarksOrientation}
            >
              Orientation Marks
            </Checkbox>
            <Picker
              name="marksOrientationLocation"
              selectedKey={marksOrientationLocation}
              onSelectionChange={(key) =>
                setMarksOrientationLocation(key as string)
              }
              gridColumn={"field"} // 2nd Column
              width={componentWidth}
            >
              <Item key={"top-left"}>Top Left</Item>
              <Item key={"top-right"}>Top Right</Item>
              <Item key={"bottom-left"}>Bottom Left</Item>
              <Item key={"bottom-right"}>Bottom Right</Item>
            </Picker>
            <Checkbox
              name="marksCenter"
              isSelected={marksCenter}
              onChange={setMarksCenter}
              gridColumn={"1 / -1"} // Use both columns
            >
              Center Marks
            </Checkbox>
            <Checkbox
              name="marksDistance"
              isSelected={marksDistance}
              onChange={setMarksDistance}
            >
              Specified Distance
            </Checkbox>
            <UnitField
              name="marksDistanceValue"
              defaultValue={marksDistanceValue}
              unit={unit}
              onChange={setMarksDistanceValue}
              gridColumn={"field"} // 2nd Column
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
        <Button
          variant="primary"
          onPress={() => evalTS("createLayer", layerName)}
        >
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
