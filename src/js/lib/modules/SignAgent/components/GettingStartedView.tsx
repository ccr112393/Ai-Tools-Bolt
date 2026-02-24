import {
  ActionButton,
  Button,
  Content,
  Divider,
  Heading,
  StatusLight,
  Text,
  Tooltip,
  TooltipTrigger
} from "@react-spectrum/s2";

import ChevronLeft from "@react-spectrum/s2/icons/ChevronLeft";
import InfoCircle from "@react-spectrum/s2/icons/InfoCircle";
import { style } from "@react-spectrum/s2/style" with { type: "macro" };
import { SignAgentDisclaimer, useTabContext } from "../../SignAgent";

export const GettingStartedButton = () => {
  const { setSelectedTab } = useTabContext();
  return (
    <TooltipTrigger>
      <Button
        variant="secondary"
        onPress={() => setSelectedTab("getting-started")}
      >
        <InfoCircle />
      </Button>
      <Tooltip>Getting Started</Tooltip>
    </TooltipTrigger>
  );
};

const CustomDivider = () => <Divider size="S" />;

export const GettingStartedView = () => {
  const { setSelectedTab } = useTabContext();

  return (
    <div>
      <div
        className={style({
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          gap: 2,
        })}>
        <ActionButton isQuiet onPress={() => setSelectedTab("signagent")}>
          <ChevronLeft />
        </ActionButton>
        <Heading level={3}>Getting Started</Heading>
      </div>
      <Content>
        <Heading level={4} styles={style({
          marginTop: 0
        })}>
          Introduction
        </Heading>
        <Text>
          Use this tool to rename the selected bounding box(es) with the
          selected command(s). A command preview will be shown below all
          selections, above the Apply button.
        </Text>
        <CustomDivider />
        <Heading level={4}>Status Lights</Heading>
        <StatusLight variant="neutral"
        >
          Gray: No selections within category
        </StatusLight>
        <StatusLight variant="informative"
        >
          Blue: Selections within category
        </StatusLight>
        <StatusLight variant="negative"
        >
          Red: Issue with selections within category
        </StatusLight>
        <CustomDivider />
        <Heading level={4}>Example</Heading>
        <Text>
          Assume we've selected horizontal center, vertical middle, uppercase,
          and leading 28 pt. The selected bounding box would be renamed to:
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
          center, middle, uppercase, leading: 28 pt
        </div>
      </Content>
      <CustomDivider />
      <SignAgentDisclaimer />
    </div>
  );
};
