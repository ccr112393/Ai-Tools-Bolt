import {
  Checkbox,
  Content,
  ContextualHelp,
  Disclosure,
  DisclosurePanel,
  DisclosureTitle,
  Heading,
  Picker,
  PickerItem,
  StatusLight,
  Text
} from "@react-spectrum/s2";

import { style } from "@react-spectrum/s2/style" with { type: "macro" };
import { newProfileSettings } from "..";
import { NumberFieldDefault, UnitPicker } from "../../../components";
import {
  componentGap,
  componentWidth3Quarters,
  componentWidthHalf
} from "../../../utils";
import { useProfile } from "../contexts";

export const TextOptionsDisclosure = () => {
  const { activeProfile, setActiveProfile, invalidSettings } = useProfile();
  const textOptions =
    activeProfile.textOptions || newProfileSettings().textOptions;

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
        <Heading
          level={5}
          styles={style({
            margin: 0,
            flex: 1
          })}>
          Text Options
        </Heading>
        <StatusLight
          variant={invalidSettings.includes("leading") ? "negative" : "informative"}
        />
        <ContextualHelp variant="help" placement="bottom">
          {/* <Heading>Text Options</Heading> */}
          <Content styles={style({
            marginTop: 0
          })}>
            <Text>Add formatting commands for text.</Text>
            <div

              className={style({
                display: "block",
                textAlign: "start",
                minWidth: 160,
                padding: 16,
                marginTop: 4,
                borderWidth: 1,
                borderRadius: "sm",
                backgroundColor: "layer-1",
                borderStyle: "solid",
                borderColor: "transparent-black-75",
                font: "body-sm"
              })}>uppercase, leading: 28 pt</div>
          </Content>
        </ContextualHelp>
      </DisclosureTitle>
      <DisclosurePanel>
        <div
          className={style({
            display: "grid",
            gridTemplateAreas: ["label field"],
            alignItems: "center",
            maxWidth: 368,
            gap: 8
          })}>
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

          >
            <PickerItem id={"uppercase"}>UPPERCASE</PickerItem>
            <PickerItem id={"lowercase"}>lowercase</PickerItem>
            <PickerItem id={"titlecase"}>Title Case</PickerItem>
          </Picker>
          <Checkbox
            isSelected={textOptions.hasLeading}
            onChange={(isSelected) => updateSettings("hasLeading", isSelected)}
          >
            Leading
          </Checkbox>
          <div

            className={style({
              display: "flex"
            })}>
            <NumberFieldDefault
              width={componentWidthHalf}
              marginEnd={componentGap}
              value={textOptions.leading}
              validationState={
                invalidSettings.includes("leading") ? "invalid" : undefined
              }
              errorMessage="Missing leading value"
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
          </div>
        </div>
      </DisclosurePanel>
    </Disclosure>
  );
};
