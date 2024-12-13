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
import Import from "@spectrum-icons/workflow/Import";
import RotateCCWBold from "@spectrum-icons/workflow/RotateCCWBold";
import SaveFloppy from "@spectrum-icons/workflow/SaveFloppy";
import { useEffect, useState } from "react";
import { evalTS } from "../../lib/utils/bolt";
import { NumberFieldDefault, UnitPicker } from "../components";
import {
  RegistrationSettings,
  RegistrationSettingsKey,
} from "./registrationModule";
import { postToast, readLocalStorage, writeLocalStorage } from "./util";

export function RegistrationComponent() {
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

  const saveSettings = () => {
    const settings: RegistrationSettings = {
      unit,
      layerName,
      diameter,
      edgeOffset,
      marksPrimary,
      marksOrientation,
      marksOrientationLocation,
      marksCenter,
      marksDistance,
      marksDistanceValue,
      colorMode,
    };
    writeLocalStorage(RegistrationSettingsKey, settings);
  };

  const loadSettings = (hideSuccess = false) => {
    const storedSettings = readLocalStorage(
      RegistrationSettingsKey,
      hideSuccess
    );
    if (storedSettings) {
      const settings: RegistrationSettings = storedSettings;
      setUnit(settings.unit.toString()),
        setLayerName(settings.layerName),
        setDiameter(settings.diameter),
        setEdgeOffset(settings.edgeOffset),
        setMarksPrimary(settings.marksPrimary),
        setMarksOrientation(settings.marksOrientation),
        setMarksOrientationLocation(settings.marksOrientationLocation),
        setMarksCenter(settings.marksCenter),
        setMarksDistance(settings.marksDistance),
        setMarksDistanceValue(settings.marksDistanceValue),
        setColorMode(settings.colorMode);
    }
  };

  useEffect(() => {
    loadSettings(true);
  }, []);

  return (
    <>
      <Flex
        direction={"row"}
        alignItems={"center"}
        justifyContent={"space-between"}
        alignContent={"center"}
      >
        <Heading level={3}>Setup</Heading>
      </Flex>

      <Grid
        areas={["label field"]}
        gap={"size-100"}
        alignItems={"center"}
        maxWidth={"size-4600"}
      >
        <Text>Unit Type</Text>
        <UnitPicker
          selectedKey={unit}
          onSelectionChange={(key) => setUnit(key.toString())}
          maxWidth={componentWidth}
        />

        <Text>Layer Name</Text>
        <TextField
          name="layerName"
          value={layerName}
          onChange={setLayerName}
          width={componentWidth}
        />

        <Text>Diameter</Text>
        <NumberFieldDefault
          name="diameter"
          value={diameter}
          onChange={setDiameter}
          width={componentWidth}
        />

        <Text>Edge Offset</Text>
        <NumberFieldDefault
          name="edgeOffset"
          value={edgeOffset}
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
            <NumberFieldDefault
              name="marksDistanceValue"
              defaultValue={marksDistanceValue}
              onChange={setMarksDistanceValue}
              gridColumn={"field"} // 2nd Column
              width={componentWidth}
            />
          </Grid>
        </DisclosurePanel>
      </Disclosure>
      <Flex justifyContent={"space-between"} marginTop={"size-200"}>
        <ActionGroup
          overflowMode="collapse"
          buttonLabelBehavior="hide"
          onAction={(key: React.Key) => {
            switch (key) {
              case "reload":
                window.location.reload();
              case "load":
                loadSettings();
                break;
              case "save":
                saveSettings();

              default:
                break;
            }
          }}
        >
          <Item key="reload">
            <RotateCCWBold size="S" marginStart={6.5} />
            <Text>Reload</Text>
          </Item>
          <Item key="save">
            <SaveFloppy size="S" marginStart={6.5} />
            <Text>Save Settings</Text>
          </Item>
          <Item key="load">
            <Import size="S" marginStart={6.5} />
            <Text>Load Settings</Text>
          </Item>
        </ActionGroup>
        <Button
          variant="primary"
          onPress={() => {
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
              .catch((err) => {
                console.log(err);
                postToast("negative", err);
              })
              .then((result) => {
                console.log(result);
                result
                  ? postToast("positive", "Registration Applied")
                  : postToast("negative", "Unable to apply registration");
              });
          }}
        >
          Apply
        </Button>
      </Flex>
    </>
  );
}