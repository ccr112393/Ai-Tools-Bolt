import {
  Content,
  Flex,
  Heading,
  LabeledValue,
  Text,
  Link,
} from "@adobe/react-spectrum";
import { ModuleList } from "../ModuleType";
import {
  componentGap,
  componentGapDouble,
  openLinkInBrowser,
} from "../../utils";

export function AboutComponent() {
  const modules = ModuleList.filter((item) => item !== "About");

  return (
    <Flex direction={"column"}>
      <Heading level={2}>Ai Tools</Heading>
      <LabeledValue label="Version" value="3.0.0" labelPosition="side" />
      <LabeledValue label="Modules" value={modules} labelPosition="side" />
      <br />
      <Content>
        <Heading level={3}>Need Help?</Heading>
        <Text>
          If you have any issues, questions, or suggestions, please fill out{" "}
          <Link
            isQuiet
            onPress={(e) => openLinkInBrowser("https://tally.so/r/w7gy7A")}
          >
            this form
          </Link>
          .
        </Text>
      </Content>
      <br />
      <LabeledValue
        label="Author"
        value="Charles Robinson"
        labelPosition="side"
      />
      <LabeledValue
        label="Links"
        labelPosition="side"
        value={
          <>
            <Link
              isQuiet
              onPress={(e) =>
                openLinkInBrowser(
                  "https://www.linkedin.com/in/charles-robinson-104304ba/"
                )
              }
            >
              LinkedIn
            </Link>
            ,{" "}
            <Link
              isQuiet
              onPress={(e) =>
                openLinkInBrowser("https://github.com/ccr112393/Ai-Tools-Bolt")
              }
            >
              Github
            </Link>
          </>
        }
      />
    </Flex>
  );
}
