import { ContextualHelp, Heading, Content, Link } from "@adobe/react-spectrum";
import { openLinkInBrowser } from "../../../lib/utils/bolt";

export const SignAgentDisclaimer = () => {
  return (
    <ContextualHelp variant="info">
      <Heading>Disclaimer</Heading>
      <Content>
        <Text>
          I am <i>not</i> affiliated with SignAgent™.
          <p>
            To learn more, visit their website at{" "}
            <Link
              isQuiet
              onPress={(e) => openLinkInBrowser("https://signagent.com")}
            >
              signagent.com
            </Link>
            .
          </p>
        </Text>
      </Content>
    </ContextualHelp>
  );
};
