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
import { useEffect, useState } from "react";

import Revert from "@spectrum-icons/workflow/Revert";

import {
  ColorDisclosure,
  GettingStartedDisclosure,
  JustificationDisclosure,
  ProfileBar,
  readFormattingCommand,
  SignAgentColorList,
  TextOptionsDisclosure,
  useFormattingCommand,
  useProfile,
} from "../SignAgent";

import { evalTS } from "../../../lib/utils/bolt";
import {
  componentGap,
  iconMarginAdjust,
  postToast,
  readLocalStorage,
} from "../../utils";
import { getLogger } from "../Developer";

export function SignAgentComponent() {
  const logger = getLogger();
  const {
    activeProfile,
    setActiveProfile,
    saveActiveProfile,
    readProfile,
    loadProfiles,
  } = useProfile();

  const [colorList, setColorList] = useState([
    { id: "signcolor", name: "Sign Color" },
    { id: "textcolor", name: "Text Color" },
  ]);

  const formattingCommand = useFormattingCommand(activeProfile);

  const loadColorList = () => {
    const storedSettings = readLocalStorage("colorList");
    if (storedSettings) {
      const settings: SignAgentColorList = storedSettings;
      setColorList(settings.colorList);
    }
  };

  const handleAction = (action: string) => {
    switch (action) {
      case "readLayer":
        readFormattingCommand().then((newSettings) => {
          setActiveProfile(newSettings);
        });
        break;

      case "saveProfile":
        saveActiveProfile(true);
        break;

      case "revertProfile":
        setActiveProfile(readProfile(activeProfile.id));
        postToast("positive", "Profile settings reverted");
        break;

      case "apply":
        evalTS("getSelectionCount").then((count) => {
          if (count > 0) {
            evalTS("renameSelectedPaths", "", formattingCommand, true)
              .catch((err) => {
                logger.addLog(err);
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
        <ColorDisclosure colorList={colorList} setColorList={setColorList} />
        <TextOptionsDisclosure />
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
          <Item key="readLayer">
            <Import size="S" marginStart={iconMarginAdjust} />
            <Text>Read Selected Layer</Text>
          </Item>
          <Item key="saveProfile">
            <SaveAsFloppy size="S" marginStart={iconMarginAdjust} />
            <Text>Save Profile Settings</Text>
          </Item>
          <Item key="revertProfile">
            <Revert size="S" marginStart={iconMarginAdjust} />
            <Text>Revert to last profile save</Text>
          </Item>
        </ActionGroup>
        <Button
          variant="accent"
          isDisabled={formattingCommand.length <= 0}
          onPress={() => handleAction("apply")}
        >
          Apply
        </Button>
      </Flex>
    </Flex>
  );
}