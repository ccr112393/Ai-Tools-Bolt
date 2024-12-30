import {
  Disclosure,
  DisclosureTitle,
  Heading,
  DisclosurePanel,
  Grid,
  Checkbox,
  Picker,
  Item,
} from "@adobe/react-spectrum";
import { NumberFieldDefault } from "../../../components";
import { componentWidth } from "../../../utils";
import { useRegistration } from "../contexts/RegistrationContext";

export function PlacementOptionsDisclosure() {
  const { registrationSettings, updateSettings } = useRegistration();
  return (
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
            isSelected={registrationSettings.marksPrimary}
            onChange={(key) => updateSettings("marksPrimary", key)}
            gridColumn={"1 / -1"} // Use both columns
          >
            Primary Marks
          </Checkbox>

          <Checkbox
            name="marksOrientation"
            isSelected={registrationSettings.marksOrientation}
            onChange={(key) => updateSettings("marksOrientation", key)}
          >
            Orientation Marks
          </Checkbox>
          <Picker
            name="marksOrientationLocation"
            selectedKey={registrationSettings.marksOrientationLocation}
            onSelectionChange={(key) =>
              updateSettings("marksOrientationLocation", key as string)
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
            isSelected={registrationSettings.marksCenter}
            onChange={(key) => updateSettings("marksCenter", key)}
            gridColumn={"1 / -1"} // Use both columns
          >
            Center Marks
          </Checkbox>
          <Checkbox
            name="marksDistance"
            isSelected={registrationSettings.marksDistance}
            onChange={(key) => updateSettings("marksDistance", key)}
          >
            Specified Distance
          </Checkbox>
          <NumberFieldDefault
            name="marksDistanceValue"
            defaultValue={registrationSettings.marksDistanceValue}
            onChange={(key) => updateSettings("marksDistanceValue", key)}
            gridColumn={"field"} // 2nd Column
            width={componentWidth}
          />
        </Grid>
      </DisclosurePanel>
    </Disclosure>
  );
}
