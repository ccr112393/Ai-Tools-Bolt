import {
  Checkbox,
  Content,
  ContextualHelp,
  Disclosure,
  DisclosurePanel,
  DisclosureTitle,
  Grid,
  Heading,
  Item,
  Picker,
  StatusLight,
  Text,
  Well,
} from "@adobe/react-spectrum";

import { getLogger, newProfileSettings, ProfileSettings } from "../..";
import { componentGap, componentWidth } from "../../../utils";
import { useProfile } from "../contexts";

export const JustificationDisclosure = () => {
  const logger = getLogger();
  const { activeProfile, setActiveProfile } = useProfile();
  const justification =
    activeProfile.justification || newProfileSettings().justification;

  const updateSettings = (
    key: keyof ProfileSettings["justification"],
    value: any
  ) => {
    console.log(`Updating ${key} to ${value}`);
    setActiveProfile((prevSettings) => ({
      ...prevSettings,
      justification: {
        ...prevSettings.justification,
        [key]: value,
      },
    }));
  };

  return (
    <Disclosure id="justification">
      <DisclosureTitle>
        {/* <Text flex>Justification</Text> */}
        <Heading level={5} margin={0} flex>
          Justification
        </Heading>
        <StatusLight
          isDisabled={
            !justification.hasHorizontal && !justification.hasVertical
          }
          variant="info"
          marginTop={-7}
          marginBottom={-10}
        />
        <ContextualHelp variant="help" placement="bottom end">
          {/* <Heading>Justification</Heading> */}
          <Content marginTop={0}>
            <Text>Add formatting commands for justification.</Text>
            <Well marginTop={componentGap}>center, middle</Well>
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
            isSelected={justification.hasHorizontal}
            onChange={(isSelected) =>
              updateSettings("hasHorizontal", isSelected)
            }
          >
            Horizontal
          </Checkbox>
          <Picker
            width={componentWidth}
            selectedKey={justification.horizontal}
            onSelectionChange={(key) => updateSettings("horizontal", key)}
          >
            <Item key="left">Left</Item>
            <Item key="center">Center</Item>
            <Item key="right">Right</Item>
          </Picker>

          <Checkbox
            isSelected={justification.hasVertical}
            onChange={(isSelected) => updateSettings("hasVertical", isSelected)}
          >
            Vertical
          </Checkbox>
          <Picker
            width={componentWidth}
            selectedKey={justification.vertical}
            onSelectionChange={(key) => updateSettings("vertical", key)}
          >
            <Item key="top">Top</Item>
            <Item key="middle">Middle</Item>
            <Item key="bottom">Bottom</Item>
          </Picker>
        </Grid>
      </DisclosurePanel>
    </Disclosure>
  );
};
