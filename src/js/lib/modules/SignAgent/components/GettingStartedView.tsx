import {
  ActionButton,
  Content,
  Flex,
  Heading,
  View,
  Text,
  Divider,
  StatusLight,
  Well,
} from "@adobe/react-spectrum";
import { componentGap, componentGapDouble } from "../../../utils";
import ChevronLeft from "@spectrum-icons/workflow/ChevronLeft";
import { SignAgentDisclaimer, useTabContext } from "../../SignAgent";
import InfoOutline from "@spectrum-icons/workflow/InfoOutline";

export const GettingStartedButton = () => {
  const { setSelectedTab } = useTabContext();
  return (
    <ActionButton isQuiet onPress={() => setSelectedTab("getting-started")}>
      <InfoOutline />
    </ActionButton>
  );
};

const CustomDivider = () => <Divider size="S" marginY={componentGap} />;

export const GettingStartedView = () => {
  const { setSelectedTab } = useTabContext();

  return (
    <View marginTop={componentGapDouble}>
      <Flex direction={"row"} gap={componentGap} alignItems={"center"}>
        <ActionButton isQuiet onPress={() => setSelectedTab("signagent")}>
          <ChevronLeft />
        </ActionButton>
        <Heading level={3}>Getting Started</Heading>
      </Flex>
      <Content>
        <Heading level={4} marginTop={0}>
          Introduction
        </Heading>
        <Text>
          Use this tool to rename the selected bounding box(es) with the
          selected command(s). A command preview will be shown below all
          selections, above the Apply button.
        </Text>
        <CustomDivider />
        <Heading level={4}>Status Lights</Heading>
        <StatusLight variant="neutral" marginY={componentGap}>
          Gray: No selections within category
        </StatusLight>
        <StatusLight variant="info" marginY={componentGap}>
          Blue: Selections within category
        </StatusLight>
        <StatusLight variant="negative" marginY={componentGap}>
          Red: Issue with selections within category
        </StatusLight>
        <CustomDivider />
        <Heading level={4}>Example</Heading>
        <Text>
          Assume we've selected horizontal center, vertical middle, uppercase,
          and leading 28 pt. The selected bounding box would be renamed to:
        </Text>
        <Well marginY={componentGap}>
          center, middle, uppercase, leading: 28 pt
        </Well>
      </Content>
      <CustomDivider />

      <SignAgentDisclaimer />
    </View>
  );
};
