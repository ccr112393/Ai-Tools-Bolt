import {
  Content,
  Disclosure,
  DisclosurePanel,
  DisclosureTitle,
  Divider,
  StatusLight,
  Text,
  Well,
} from "@adobe/react-spectrum";
import { SignAgentDisclaimer } from "..";
import { componentGap } from "../../modules/util";

export const GettingStartedDisclosure = () => {
  return (
    <Disclosure id="gettingStarted">
      <DisclosureTitle>
        <Text flex>Getting Started</Text>
        <SignAgentDisclaimer />
      </DisclosureTitle>
      <DisclosurePanel>
        <Content>
          <Text>
            Use this tool to rename the selected bounding box(es) with the
            selected command(s). A command preview will be shown below all
            selections.
          </Text>
          <StatusLight variant="info" marginY={componentGap}>
            The status light will turn blue when that section has any selected
            options.
          </StatusLight>
          <Divider size="S" marginY={componentGap} />
          <Text>
            Example: assume we've selected horizontal center, vertical middle,
            uppercase, and leading 28 pt. The selected bounding box would be
            renamed to:
          </Text>
          <Well marginY={componentGap}>
            center, middle, uppercase, leading: 28 pt
          </Well>
        </Content>
      </DisclosurePanel>
    </Disclosure>
  );
};
