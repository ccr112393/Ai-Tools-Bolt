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
import { SignAgentColor } from "../../modules";

export interface ColorDisclosureSettings {
  hasColor: boolean;
  hasFillColor: boolean;
  hasStrokeColor: boolean;
  color: string;
  fillColor: string;
  strokeColor: string;
}

export interface ColorDisclosureProps {
  hasColor: boolean;
  setHasColor: (value: boolean) => void;
  hasFillColor: boolean;
  setHasFillColor: (value: boolean) => void;
  hasStrokeColor: boolean;
  setHasStrokeColor: (value: boolean) => void;
  color: string;
  setColor: (value: string) => void;
  fillColor: string;
  setFillColor: (value: string) => void;
  strokeColor: string;
  setStrokeColor: (value: string) => void;
  colorList: SignAgentColor[];
  setColorList: React.Dispatch<React.SetStateAction<SignAgentColor[]>>;
}

export const ColorDisclosure: React.FC<ColorDisclosureProps> = ({
  hasColor,
  setHasColor,
  hasFillColor,
  setHasFillColor,
  hasStrokeColor,
  setHasStrokeColor,
  color,
  setColor,
  fillColor,
  setFillColor,
  strokeColor,
  setStrokeColor,
  colorList,
  setColorList,
}) => {
  return (
    <Disclosure id="color">
      <DisclosureTitle>
        <Text flex>Color</Text>
        <StatusLight
          isDisabled={!hasColor && !hasFillColor && !hasStrokeColor}
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
          <Checkbox isSelected={hasColor} onChange={setHasColor}>
            Color
          </Checkbox>
          <Picker
            width={componentWidth}
            items={colorList}
            selectedKey={color}
            onSelectionChange={(key) => setColor(key as string)}
          >
            {(item) => <Item key={item.id}>{item.name}</Item>}
          </Picker>

          <Checkbox isSelected={hasFillColor} onChange={setHasFillColor}>
            Fill Color
          </Checkbox>
          <Picker
            width={componentWidth}
            items={colorList}
            selectedKey={fillColor}
            onSelectionChange={(key) => setFillColor(key as string)}
          >
            {(item) => <Item key={item.id}>{item.name}</Item>}
          </Picker>

          <Checkbox isSelected={hasStrokeColor} onChange={setHasStrokeColor}>
            Stroke Color
          </Checkbox>
          <Picker
            width={componentWidth}
            items={colorList}
            selectedKey={strokeColor}
            onSelectionChange={(key) => setStrokeColor(key as string)}
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
