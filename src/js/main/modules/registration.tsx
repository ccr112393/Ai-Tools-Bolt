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

async function applyRegistration(
  layerName: string,
  unit: string,
  diameter: number,
  edgeOffset: number,
  marksPrimary: boolean,
  marksOrientation: boolean,
  marksOrientationLocation: string,
  marksCenter: boolean,
  marksDistance: boolean,
  marksDistanceValue: number
) {
  console.log("applyRegistration");
  const doc = await evalTS("currentDocument");
  const docWidth = await evalTS("getDocumentWidth");
  const docHeight = await evalTS("getDocumentHeight");
  const fillColor = await evalTS("createColorCMYK", 0, 0, 0, 100);
  const layer =
    (await evalTS("getLayerByName", layerName)) ||
    (await evalTS("createLayer", layerName));
  const diameterPoints = await evalTS("convertToPoints", diameter, unit);
  const edgeOffsetPoints =
    (await evalTS("convertToPoints", edgeOffset, unit)) - diameterPoints / 2;
  const marksDistancePoints = await evalTS(
    "convertToPoints",
    marksDistanceValue,
    unit
  );

  if (marksPrimary) {
    const coordinates = [
      [0 + edgeOffsetPoints, 0 + edgeOffsetPoints], // Bottom Left
      [docHeight - edgeOffsetPoints, 0 + edgeOffsetPoints], // Top Left
      [0 + edgeOffsetPoints, docWidth - edgeOffsetPoints], // Bottom Right
      [docHeight - edgeOffsetPoints, docWidth - edgeOffsetPoints], // Top Right
    ];

    coordinates.forEach((set) =>
      evalTS("drawEllipse", layer, set[0], set[1], diameterPoints, fillColor)
    );
  }
}

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
  const [colorMode, setColorMode] = useState("cmyk");

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
            [
              "Unit Type",
              <UnitPicker
                defaultSelectedKey={unit}
                onSelectionChange={() => setUnit}
                maxWidth={"size-1250"}
              />,
            ],
            [
              "Color Mode",
              <Picker
                defaultSelectedKey={colorMode}
                onSelectionChange={() => setColorMode}
                maxWidth={"size-1250"}
              >
                <Item key={"cmyk"}>CMYK</Item>
                <Item key={"rgb"}>RGB</Item>
              </Picker>,
            ],
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
          onPress={() =>
            // evalTS("getLayerByName", "Testing1234").then((result) =>
            //   console.log(result)
            // )
            evalTS(
              "addRegistration",
              layerName,
              unit,
              diameter,
              edgeOffset,
              marksPrimary,
              marksOrientation,
              marksOrientationLocation,
              marksCenter,
              marksDistance,
              marksDistanceValue
            )
              .catch((err) => console.log(err))
              .then((result) => console.log(result))
          }
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

/* 
evalTS(
              "addRegistration",
              layerName,
              unit,
              diameter,
              edgeOffset,
              marksPrimary,
              marksOrientation,
              marksOrientationLocation,
              marksCenter,
              marksDistance,
              marksDistanceValue
            )
          }
*/
