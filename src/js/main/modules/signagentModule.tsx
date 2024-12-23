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
import {
  componentGap,
  iconMarginAdjust,
  postToast,
  readLocalStorage,
} from "./util";

import Revert from "@spectrum-icons/workflow/Revert";
import { evalTS } from "../../lib/utils/bolt";
import {
  ColorDisclosure,
  GettingStartedDisclosure,
  JustificationDisclosure,
  ProfileBar,
  SignAgentColorList,
  TextOptionsDisclosure,
} from "../components";

import { useFormattingCommand } from "../hooks/";
import { useLog } from "../contexts/LogContext";
import { ProfileProvider, useProfile } from "../contexts";

export function SignAgentComponent() {
  const { appLog } = useLog();
  const {
    activeProfileID,
    setActiveProfileID,
    activeProfile,
    setActiveProfile,
    profileList,
    writeProfile,
    readProfile,
    profileSettings,
    setProfileSettings,
    loadProfiles,
    addProfile,
    removeProfile,
    validateProfile,
  } = useProfile();

  const [colorList, setColorList] = useState([
    { id: "signcolor", name: "Sign Color" },
    { id: "textcolor", name: "Text Color" },
  ]);

  const formattingCommand = useFormattingCommand(profileSettings);

  const loadColorList = (hideSuccess = false) => {
    const storedSettings = readLocalStorage("colorList", hideSuccess);
    if (storedSettings) {
      const settings: SignAgentColorList = storedSettings;
      setColorList(settings.colorList);
    }
  };

  useEffect(() => {
    loadColorList(true); // Load color list
  }, []);

  return (
    <ProfileProvider>
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
            onAction={(key: React.Key) => {
              switch (key) {
                case "readLayer":
                  break;

                case "saveProfile":
                  writeProfile(activeProfile);
                  break;

                case "revertProfile":
                  readProfile(activeProfileID);
                  postToast("positive", "Profile settings reverted");
                  break;

                default:
                  break;
              }
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
            onPress={() =>
              evalTS("renameSelectedPaths", "", formattingCommand, true)
                .catch((err) => {
                  appLog(err);
                  postToast("negative", err);
                })
                .then((result) => {
                  result
                    ? postToast("positive", "Formatting command applied")
                    : postToast(
                        "negative",
                        "Unable to apply formatting command"
                      );
                })
            }
          >
            Apply
          </Button>
        </Flex>
      </Flex>
    </ProfileProvider>
  );
}
