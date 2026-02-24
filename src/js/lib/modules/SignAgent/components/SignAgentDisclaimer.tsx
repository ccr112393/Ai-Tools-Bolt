import { Content, Heading, Link } from "@react-spectrum/s2";
import { openLinkInBrowser } from "../../../utils/bolt";

export const SignAgentDisclaimer = () => {
  return (
    <>
      <Heading level={4}>Disclaimer</Heading>
      <Content>
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
      </Content>
    </>
  );
};
