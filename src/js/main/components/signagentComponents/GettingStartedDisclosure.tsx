import {
  Disclosure,
  DisclosureTitle,
  DisclosurePanel,
  Content,
  Well,
  StatusLight,
  Text,
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
            Use this tool to rename the currently selected bounding box(es) with
            the selected command(s).
            <br />
            <br />
            For example, assume we've selected horizontal center, vertical
            middle, uppercase, and leading 28 pt. The selected bounding box
            would be renamed to:
          </Text>
          <Well marginY={componentGap}>
            center, middle, uppercase, leading: 28 pt
          </Well>
          <StatusLight variant="info">
            Status Light will turn blue when section has selection
          </StatusLight>
        </Content>
      </DisclosurePanel>
    </Disclosure>
  );
};
