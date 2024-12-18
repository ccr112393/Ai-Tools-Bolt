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
  Flex,
  Text,
} from "@adobe/react-spectrum";
import { NumberFieldDefault, UnitPicker } from "..";
import {
  componentGap,
  componentWidth,
  componentWidthHalf,
} from "../../modules/util";

export interface TextOptionsDisclosureProps {
  hasTextCase: boolean;
  setHasTextCase: (value: boolean) => void;
  textCase: string;
  setTextCase: (value: string) => void;
  hasLeading: boolean;
  setHasLeading: (value: boolean) => void;
  leading: number;
  setLeading: (value: number) => void;
}

export const TextOptionsDisclosure: React.FC<TextOptionsDisclosureProps> = ({
  hasTextCase,
  setHasTextCase,
  textCase,
  setTextCase,
  hasLeading,
  setHasLeading,
  leading,
  setLeading,
}) => {
  return (
    <Disclosure id="textcase">
      <DisclosureTitle>
        <Text flex>Text Options</Text>
        <StatusLight
          isDisabled={!hasTextCase}
          variant="info"
          marginTop={-7}
          marginBottom={-10}
        />
        <ContextualHelp variant="help">
          {/* <Heading>Text Options</Heading> */}
          <Content marginTop={0}>
            <Text>Add formatting commands for text.</Text>
            <Well marginTop={componentGap}>uppercase, leading: 28 pt</Well>
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
          <Checkbox isSelected={hasTextCase} onChange={setHasTextCase}>
            Text Case
          </Checkbox>
          <Picker
            selectedKey={textCase}
            onSelectionChange={(key) => {
              setTextCase(key as string);
            }}
            width={componentWidth}
          >
            <Item key={"up"}>UPPERCASE</Item>
            <Item key={"lo"}>lowercase</Item>
            <Item key={"tc"}>Title Case</Item>
          </Picker>
          <Checkbox isSelected={hasLeading} onChange={setHasLeading}>
            Leading
          </Checkbox>
          <Flex width={componentWidth}>
            <NumberFieldDefault
              width={componentWidthHalf}
              marginEnd={componentGap}
              value={leading}
              onChange={setLeading}
            />
            <UnitPicker
              abbreviate={true}
              defaultSelectedKey={"point"}
              width={componentWidthHalf}
            />
          </Flex>
        </Grid>
      </DisclosurePanel>
    </Disclosure>
  );
};
