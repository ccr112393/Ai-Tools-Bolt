import {
  Accordion,
  ActionGroup,
  Button,
  Flex,
  Heading,
  Item,
  Text,
  Well,
} from "@adobe/react-spectrum";
import Import from "@spectrum-icons/workflow/Import";
import SaveAsFloppy from "@spectrum-icons/workflow/SaveAsFloppy";
import { useEffect } from "react";

import Erase from "@spectrum-icons/workflow/Erase";
import { newProfileSettings } from "..";
import {
  componentGap,
  iconMarginAdjust,
  postToast,
  readLocalStorage,
} from "../../utils";
import { evalTS } from "../../utils/bolt";
import {
  ColorDisclosure,
  EditorDisclosure,
  GettingStartedDisclosure,
  JustificationDisclosure,
  ProfileBar,
  TextOptionsDisclosure,
} from "./components";
import { SignAgentColorList, useColorContext, useProfile } from "./contexts";
import { readFormattingCommand, useFormattingCommand } from "./hooks";

export function SignAgentComponent() {
  const {
    activeProfile,
    setActiveProfile,
    saveActiveProfile,
    loadProfiles,
    invalidSettings,
  } = useProfile();

  const { colorList, setColorList } = useColorContext();

  const formattingCommand = useFormattingCommand(activeProfile);

  const loadColorList = () => {
    const storedSettings = readLocalStorage("colorList");
    if (storedSettings) {
      const settings: SignAgentColorList = storedSettings;
      if (colorList != settings.colorList) {
        setColorList(settings.colorList);
      }
    }
  };

  const readPathCommand = async () => {
    let pathItemName: any;
    await evalTS("getCurrentPathItemName").then(
      (result) => (pathItemName = result)
    );

    if (typeof pathItemName === "string" && pathItemName != "") {
      const newSettings = await readFormattingCommand(pathItemName);
      console.log("Read Layer:" + newSettings.id);
      setActiveProfile(newSettings);
    } else {
      postToast("info", "No path item selected");
    }
  };

  const clearSelection = () => {
    const clearedProfile = {
      ...newProfileSettings(),
      id: activeProfile.id,
      name: activeProfile.name,
    };
    setActiveProfile(clearedProfile);
    postToast("positive", "Cleared selections");
    console.log(clearedProfile);
  };

  const handleAction = (action: string) => {
    switch (action) {
      case "readPathCommand":
        readPathCommand();

        break;

      case "saveProfile":
        saveActiveProfile(true);
        break;

      case "clearSelection":
        clearSelection();
        break;

      case "apply":
        evalTS("getSelectionCount").then((count) => {
          if (count > 0) {
            evalTS("renameSelectedPaths", "", formattingCommand, true)
              .catch((err) => {
                console.log(err);
                postToast("negative", err);
              })
              .then((result) => {
                result
                  ? postToast("positive", "Formatting command applied")
                  : postToast("negative", "Unable to apply formatting command");
              });
          } else {
            postToast("neutral", "No path items selected");
          }
        });

        break;

      default:
        break;
    }
  };

  useEffect(() => {
    console.log("Hello from SignAgentComponent");
    loadProfiles();
    loadColorList(); // Load color list
  }, []);

  return (
    <Flex direction={"column"} alignSelf={"center"}>
      <Heading level={2}>SignAgent™ Tools</Heading>
      <ProfileBar />
      <Accordion allowsMultipleExpanded>
        <GettingStartedDisclosure />
        <JustificationDisclosure />
        <ColorDisclosure />
        <TextOptionsDisclosure />
        <EditorDisclosure />
      </Accordion>

      <Well marginTop={componentGap} isHidden={formattingCommand == ""}>
        <Text>{formattingCommand}</Text>
      </Well>
      <Flex justifyContent={"space-between"} marginTop={"size-200"}>
        <ActionGroup
          overflowMode="collapse"
          buttonLabelBehavior="hide"
          onAction={(key) => {
            handleAction(key as string);
          }}
        >
          <Item key="readPathCommand">
            <Import size="S" marginStart={iconMarginAdjust} />
            <Text>Read formatting command from selected bounding box</Text>
          </Item>
          <Item key="saveProfile">
            <SaveAsFloppy size="S" marginStart={iconMarginAdjust} />
            <Text>Save Profile Settings</Text>
          </Item>
          <Item key="clearSelection">
            <Erase size="S" marginStart={iconMarginAdjust} />
            <Text>Clear all selections</Text>
          </Item>
        </ActionGroup>
        <Button
          variant="accent"
          isDisabled={
            formattingCommand.length <= 0 || invalidSettings.length > 0
          }
          onPress={() => handleAction("apply")}
        >
          Apply
        </Button>
      </Flex>
    </Flex>
  );
}
