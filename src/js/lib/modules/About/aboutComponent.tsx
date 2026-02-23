import {
  Button,
  Content,
  Flex,
  Grid,
  Heading,
  LabeledValue,
  Link,
  Text,
} from "@adobe/react-spectrum";
import { useState } from "react";
import { appInfo } from "../../../../../cep-variant.config";
import { componentGap, openLinkInBrowser, postToast } from "../../utils";
import { ModuleType } from "../ModuleType";
// import { Modules } from "../Modules";

export function AboutComponent() {
  const Modules = JSON.parse(localStorage.getItem("enabledModules") || "[]") as ModuleType[];
  const ModuleList: string[] = Modules.map((module) => module.name);

  const modules = ModuleList.filter((item) => item !== "About");

  const handleReset = () => {
    if (!confirmReset) {
      setConfirmReset(true);
      return;
    }
    postToast("negative", "Resetting...");
    localStorage.clear();
    window.location.reload();
  };

  const [confirmReset, setConfirmReset] = useState(false);

  return (
    <Flex direction={"column"}>
      <Heading level={2}>{appInfo.displayName}</Heading>

      <Grid
        gap={componentGap}
        columns={"min-content 1fr"}
        alignItems={"first baseline"}
      >
        <LabeledValue label="Version" value={""} />
        <Text>{appInfo.version}</Text>

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
        {confirmReset ? "Confirm Reset" : `Reset ${appInfo.displayName}`}
      </Button>
    </Flex>
  );
}
