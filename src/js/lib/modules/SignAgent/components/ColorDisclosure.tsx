import {
  Checkbox,
  Picker,
  Content,
  ContextualHelp,
  Disclosure,
  DisclosurePanel,
  DisclosureTitle,
  Grid,
  Item,
  StatusLight,
  Text,
  Well,
} from "@adobe/react-spectrum";
import { componentGap, componentWidth } from "../../../utils";
import { useProfile } from "../contexts";
import { ColorFieldsDialog } from "./ColorFieldsDialog";
import { useState } from "react";

export interface SignAgentColor {
  id: string;
  name: string;
}

export interface SignAgentColorList {
  colorList: SignAgentColor[];
}

export interface ColorDisclosureProps {
  colorList: SignAgentColor[];
  setColorList: React.Dispatch<React.SetStateAction<SignAgentColor[]>>;
}

export const ColorDisclosure: React.FC<ColorDisclosureProps> = ({
  colorList,
  setColorList,
}) => {
  const { activeProfile, setActiveProfile, invalidSettings } = useProfile();
  const color = activeProfile.color;
  const [hasInvalid, setHasInvalid] = useState(false);

  const updateSettings = (key: string, value: any) => {
    setActiveProfile((prevSettings) => ({
      ...prevSettings,
      color: {
        ...prevSettings.color,
        [key]: value,
      },
    }));
  };

  return (
    <Disclosure id="color">
      <DisclosureTitle>
        <Text flex>Color</Text>
        <StatusLight
          isDisabled={
            !color.hasColor && !color.hasFillColor && !color.hasStrokeColor
          }
          variant={
            ["color", "fillColor", "strokeColor"].some((fields) =>
              invalidSettings.includes(fields)
            )
              ? "negative"
              : "info"
          }
          marginTop={-7}
          marginBottom={-10}
        />
        <ContextualHelp variant="help">
          {/* <Heading>Color</Heading> */}
          <Content marginTop={0}>
            <Text>
              Add formatting commands for dynamic colors, using field names
              defined within SignAgent.
            </Text>
            <Well marginTop={componentGap}>
              stroke_color: copy_color, fill_color: sign_color
            </Well>
          </Content>
        </ContextualHelp>
      </DisclosureTitle>
      <DisclosurePanel>
        <Grid
          areas={["label field"]}
          alignItems={"center"}
          maxWidth={"size-4600"}
          gap={"size-100"}
        >
          <Checkbox
            isSelected={color.hasColor}
            onChange={(isSelected) => updateSettings("hasColor", isSelected)}
          >
            Color
          </Checkbox>
          <Picker
            width={componentWidth}
            items={colorList}
            selectedKey={color.color}
            isInvalid={invalidSettings.includes("color")}
            onSelectionChange={(key) => updateSettings("color", key)}
          >
            {(item) => <Item key={item.id}>{item.name}</Item>}
          </Picker>

          <Checkbox
            isSelected={color.hasFillColor}
            onChange={(isSelected) =>
              updateSettings("hasFillColor", isSelected)
            }
          >
            Fill Color
          </Checkbox>
          <Picker
            width={componentWidth}
            items={colorList}
            selectedKey={color.fillColor}
            isInvalid={invalidSettings.includes("fillColor")}
            onSelectionChange={(key) => updateSettings("fillColor", key)}
          >
            {(item) => <Item key={item.id}>{item.name}</Item>}
          </Picker>

          <Checkbox
            isSelected={color.hasStrokeColor}
            onChange={(isSelected) =>
              updateSettings("hasStrokeColor", isSelected)
            }
          >
            Stroke Color
          </Checkbox>
          <Picker
            width={componentWidth}
            items={colorList}
            selectedKey={color.strokeColor}
            isInvalid={invalidSettings.includes("strokeColor")}
            onSelectionChange={(key) => updateSettings("strokeColor", key)}
          >
            {(item) => <Item key={item.id}>{item.name}</Item>}
          </Picker>

          <ColorFieldsDialog
            colorList={colorList}
            setColorList={setColorList}
          />
        </Grid>
      </DisclosurePanel>
    </Disclosure>
  );
};
