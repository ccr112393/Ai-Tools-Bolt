import {
  Checkbox,
  Content,
  ContextualHelp,
  Disclosure,
  DisclosurePanel,
  DisclosureTitle,
  Flex,
  Grid,
  Item,
  Picker,
  StatusLight,
  Text,
  Well,
} from "@adobe/react-spectrum";
import { NumberFieldDefault, UnitPicker } from "../../../components";

import { emptyProfileSettings, useProfile } from "../..";
import {
  componentGap,
  componentWidth,
  componentWidth3Quarters,
  componentWidthHalf,
} from "../../../utils";

export const TextOptionsDisclosure = () => {
  const { activeProfile, setActiveProfile } = useProfile();
  const textOptions =
    activeProfile.textOptions || emptyProfileSettings.textOptions;

  const updateSettings = (key: string, value: any) => {
    setActiveProfile((prevSettings) => ({
      ...prevSettings,
      textOptions: {
        ...prevSettings.textOptions,
        [key]: value,
      },
    }));
  };

  return (
    <Disclosure id="textcase">
      <DisclosureTitle>
        <Text flex>Text Options</Text>
        <StatusLight
          isDisabled={!textOptions.hasTextCase && !textOptions.hasLeading}
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
          <Checkbox
            isSelected={textOptions.hasTextCase}
            onChange={(isSelected) => updateSettings("hasTextCase", isSelected)}
          >
            Text Case
          </Checkbox>
          <Picker
            selectedKey={textOptions.textCase}
            onSelectionChange={(key) => {
              updateSettings("textCase", key);
            }}
            width={componentWidth}
          >
            <Item key={"uppercase"}>UPPERCASE</Item>
            <Item key={"lowercase"}>lowercase</Item>
            <Item key={"titlecase"}>Title Case</Item>
          </Picker>
          <Checkbox
            isSelected={textOptions.hasLeading}
            onChange={(isSelected) => updateSettings("hasLeading", isSelected)}
          >
            Leading
          </Checkbox>
          <Flex width={componentWidth}>
            <NumberFieldDefault
              width={componentWidthHalf}
              marginEnd={componentGap}
              value={textOptions.leading}
              onChange={(value) => updateSettings("leading", value)}
            />
            <UnitPicker
              abbreviate={true}
              selectedKey={textOptions.leadingUnit}
              onSelectionChange={(key) => {
                updateSettings("leadingUnit", key);
              }}
              width={componentWidthHalf}
              menuWidth={componentWidth3Quarters}
            />
          </Flex>
        </Grid>
      </DisclosurePanel>
    </Disclosure>
  );
};
