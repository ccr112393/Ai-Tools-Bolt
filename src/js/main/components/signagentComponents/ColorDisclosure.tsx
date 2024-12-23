import {
  Disclosure,
  DisclosureTitle,
  StatusLight,
  ContextualHelp,
  Content,
  Well,
  DisclosurePanel,
  Grid,
  Checkbox,
  Picker,
  Item,
  Text,
} from "@adobe/react-spectrum";
import { ColorFieldsDialog } from "..";
import { componentGap, componentWidth } from "../../modules/util";
import { useProfile } from "../../contexts";

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
  const { activeProfile, setActiveProfile } = useProfile();
  const color = activeProfile.color;
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
          variant="info"
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
              strokecolor: copy_color, fillcolor: sign_color
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
