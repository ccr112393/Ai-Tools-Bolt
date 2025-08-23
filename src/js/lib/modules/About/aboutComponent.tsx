import {
  Content,
  Flex,
  Heading,
  LabeledValue,
  Text,
  Link,
  Grid,
  Button,
} from "@adobe/react-spectrum";
// import { ModuleList } from "../ModuleType";
import { componentGap, openLinkInBrowser, postToast } from "../../utils";
import { EnabledModules } from "..";

export function AboutComponent() {
  const ModuleList: string[] = EnabledModules.map((module) => module.name);

  const modules = ModuleList.filter((item) => item !== "About");

  const handleReset = () => {
    postToast("negative", "Resetting Ai Tools...");
    localStorage.clear();

    window.location.reload();
  };

  return (
    <Flex direction={"column"}>
      <Heading level={2}>Ai Tools</Heading>

      <Grid
        gap={componentGap}
        columns={"min-content 1fr"}
        alignItems={"first baseline"}
      >
        <LabeledValue label="Version" value={""} />
        <Text>3.0.0</Text>

        <LabeledValue label="Modules" value={""} />
        <Flex direction="column">
          {modules.map((module, index) => (
            <Text key={index}>{module}</Text>
          ))}
        </Flex>

        <LabeledValue label="Author" value="" />
        <Text>Charles Robinson</Text>

        <LabeledValue label="Links" value={""} />
        <Flex direction={"row"} gap={componentGap}>
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
          <Link
            isQuiet
            onPress={(e) =>
              openLinkInBrowser("https://github.com/ccr112393/Ai-Tools-Bolt")
            }
          >
            Github
          </Link>
          <Link
            isQuiet
            onPress={(e) =>
              openLinkInBrowser("https://buymeacoffee.com/aitools")
            }
          >
            Buy me a Coffee
          </Link>
        </Flex>
      </Grid>

      <br />

      <Content>
        <Heading level={3}>Need Help?</Heading>
        <Text>
          If you have any issues, questions, or suggestions, please{" "}
          <Link
            isQuiet
            onPress={(e) => openLinkInBrowser("https://tally.so/r/w7gy7A")}
          >
            contact me
          </Link>
          .
        </Text>
        <br />
        <br />
      </Content>
      <Button variant="negative" onPress={(e) => handleReset()}>
        Reset Ai Tools
      </Button>
    </Flex>
  );
}
