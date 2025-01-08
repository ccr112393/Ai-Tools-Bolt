import {
  Content,
  Disclosure,
  DisclosurePanel,
  DisclosureTitle,
  Divider,
  Heading,
  StatusLight,
  Text,
  Well,
} from "@adobe/react-spectrum";
import { componentGap } from "../../../utils";
import { SignAgentDisclaimer } from ".";

export const GettingStartedDisclosure = () => {
  return (
    <Disclosure id="gettingStarted">
      <DisclosureTitle>
        <Heading level={5} margin={0} flex>
          Getting Started
        </Heading>
        <SignAgentDisclaimer />
      </DisclosureTitle>
      <DisclosurePanel>
        <Content>
          <Heading level={4} marginTop={0}>
            Introduction
          </Heading>
          <Text>
            Use this tool to rename the selected bounding box(es) with the
            selected command(s). A command preview will be shown below all
            selections.
          </Text>
          <Divider size="S" marginY={componentGap} />
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
          <Divider size="S" marginY={componentGap} />
          <Heading level={4}>Example</Heading>
          <Text>
            Assume we've selected horizontal center, vertical middle, uppercase,
            and leading 28 pt. The selected bounding box would be renamed to:
          </Text>
          <Well marginY={componentGap}>
            center, middle, uppercase, leading: 28 pt
          </Well>
        </Content>
      </DisclosurePanel>
    </Disclosure>
  );
};
