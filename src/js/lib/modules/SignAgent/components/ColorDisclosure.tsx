import {
  PickerItem,
  ActionButton,
  Checkbox,
  Content,
  ContextualHelp,
  Disclosure,
  DisclosurePanel,
  DisclosureTitle,
  Heading,
  Picker,
  StatusLight,
  Text,
} from "@react-spectrum/s2";

import { style } from "@react-spectrum/s2/style" with { type: "macro" };
import { componentGap, componentWidth } from "../../../utils";
import { useColorContext, useProfile, useTabContext } from "../contexts";

export const ColorDisclosure = () => {
  const { colorList } = useColorContext();
  const { activeProfile, setActiveProfile, invalidSettings } = useProfile();
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

  const { setSelectedTab } = useTabContext();

  return (
    <Disclosure id="color">
      <DisclosureTitle>
        <Heading
          level={5}
          styles={style({
            margin: 0,
            flex: 1
          })}>
          Color
        </Heading>
        <StatusLight
          variant={
            ["color", "fillColor", "strokeColor"].some((fields) =>
              invalidSettings.includes(fields)
            )
              ? "negative"
              : "informative"
          }
        />
        <ContextualHelp variant="help" placement="bottom">
          {/* <Heading>Color</Heading> */}
          <Content styles={style({
            marginTop: 0
          })}>
            <Text>
              Add formatting commands for dynamic colors, using field names
              defined within SignAgent.
            </Text>
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
              })}>
              stroke_color: copy_color, fill_color: sign_color
            </div>
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
            isSelected={color.hasColor}
            onChange={(isSelected) => updateSettings("hasColor", isSelected)}
          >
            Color
          </Checkbox>
          <Picker
            styles={style({ width: 32 })}
            items={colorList}
            selectedKey={color.color}
            isInvalid={invalidSettings.includes("color")}
            onSelectionChange={(key) => updateSettings("color", key)}
          >
            {(item) => <PickerItem id={item.id}>{item.name}</PickerItem>}
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
            styles={style({ width: 32 })}
            items={colorList}
            selectedKey={color.fillColor}
            isInvalid={invalidSettings.includes("fillColor")}
            onSelectionChange={(key) => updateSettings("fillColor", key)}
          >
            {(item) => <PickerItem id={item.id}>{item.name}</PickerItem>}
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
            styles={style({ width: 32 })}
            items={colorList}
            selectedKey={color.strokeColor}
            isInvalid={invalidSettings.includes("strokeColor")}
            onSelectionChange={(key) => updateSettings("strokeColor", key)}
          >
            {(item) => <PickerItem id={item.id}>{item.name}</PickerItem>}
          </Picker>

          <ActionButton
            onPress={() => {
              setSelectedTab("color");
            }}
          >
            Manage Colors
          </ActionButton>
        </div>
      </DisclosurePanel>
    </Disclosure>
  );
};
