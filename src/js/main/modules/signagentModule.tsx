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
import Erase from "@spectrum-icons/workflow/Erase";
import Import from "@spectrum-icons/workflow/Import";
import SaveAsFloppy from "@spectrum-icons/workflow/SaveAsFloppy";
import { useEffect, useState } from "react";
import {
  componentGap,
  iconMarginAdjust,
  postToast,
  readLocalStorage,
  UnitList,
  writeLocalStorage,
} from "./util";

import {
  ColorDisclosure,
  GettingStartedDisclosure,
  JustificationDisclosure,
  ProfileBar,
  TextOptionsDisclosure,
} from "../components/signagentComponents/";
import {
  SignAgentColorList,
  SignAgentProfileList,
  SignAgentSettings,
  SignAgentSettingsKey,
} from "./signagentInterface";
import { evalTS } from "../../lib/utils/bolt";

export function SignAgentComponent() {
  const [hasHorizontalJustify, setHasHorizontalJustify] = useState(false);
  const [hasVerticalJustify, setHasVerticalJustify] = useState(false);
  const [horizontalJustify, setHorizontalJustify] = useState("left");
  const [verticalJustify, setVerticalJustify] = useState("top");
  const [hasColor, setHasColor] = useState(true);
  const [hasFillColor, setHasFillColor] = useState(false);
  const [hasStrokeColor, setHasStrokeColor] = useState(false);
  const [color, setColor] = useState("signcolor");
  const [fillColor, setFillColor] = useState("signcolor");
  const [strokeColor, setStrokeColor] = useState("signcolor");
  const [hasTextCase, setHasTextCase] = useState(false);
  const [textCase, setTextCase] = useState("uppercase");
  const [hasLeading, setHasLeading] = useState(false);
  const [leading, setLeading] = useState(3);
  const [leadingUnit, setLeadingUnit] = useState("point");
  const [colorList, setColorList] = useState([
    { id: "signcolor", name: "Sign Color" },
    { id: "textcolor", name: "Text Color" },
  ]);
  const [activeProfile, setActiveProfile] = useState("default");
  const [profiles, setProfiles] = useState([
    { id: "default", name: "Default" },
  ]);
  const [formattingCommand, setFormattingCommand] = useState("");

  const createFormattingCommand = (): string => {
    let cmd: string[] = [];
    if (hasHorizontalJustify) {
      cmd.push(horizontalJustify);
    }
    if (hasVerticalJustify) {
      cmd.push(verticalJustify);
    }
    if (hasColor) {
      cmd.push(`color: {${color}}`);
    }
    if (hasFillColor) {
      cmd.push(`fill_color: {${fillColor}}`);
    }
    if (hasStrokeColor) {
      cmd.push(`stroke_color: {${strokeColor}}`);
    }
    if (hasTextCase) {
      cmd.push(textCase);
    }
    if (hasLeading) {
      let leadingUnitAbbr = UnitList.find(
        (unit) => unit.key == leadingUnit
      )?.abbr;
      cmd.push(`leading: ${leading.toString()} ${leadingUnitAbbr}`);
    }
    return cmd.join(", ");
  };

  useEffect(() => {
    setFormattingCommand(createFormattingCommand());
  }, [
    hasHorizontalJustify,
    hasVerticalJustify,
    horizontalJustify,
    verticalJustify,
    hasColor,
    hasFillColor,
    hasStrokeColor,
    color,
    fillColor,
    strokeColor,
    hasTextCase,
    textCase,
    hasLeading,
    leading,
    leadingUnit,
  ]);

  const loadColorList = (hideSuccess = false) => {
    const storedSettings = readLocalStorage("colorList", hideSuccess);
    if (storedSettings) {
      const settings: SignAgentColorList = storedSettings;
      setColorList(settings.colorList);
    }
  };

  const loadProfiles = (hideSuccess = false) => {
    const storedSettings = readLocalStorage("profiles", hideSuccess);
    if (storedSettings) {
      const settings: SignAgentProfileList = storedSettings;
      setProfiles(settings.profiles);
    }
  };

  const saveSettings = (profileName = "default") => {
    let keyName = `${SignAgentSettingsKey}_${profileName}`;
    const settings: SignAgentSettings = {
      hasHorizontalJustify,
      hasVerticalJustify,
      horizontalJustify,
      verticalJustify,
      hasColor,
      hasFillColor,
      hasStrokeColor,
      color,
      fillColor,
      strokeColor,
      hasTextCase,
      textCase,
      hasLeading,
      leading,
      leadingUnit,
    };
    writeLocalStorage(keyName, settings);
  };

  const loadSettings = (hideSuccess = false, profileName = "default") => {
    let keyName = `${SignAgentSettingsKey}_${profileName}`;
    const storedSettings = readLocalStorage(keyName, hideSuccess);

    if (storedSettings) {
      const settings: SignAgentSettings = storedSettings;
      setHasHorizontalJustify(settings.hasHorizontalJustify),
        setHasVerticalJustify(settings.hasVerticalJustify),
        setHorizontalJustify(settings.horizontalJustify),
        setVerticalJustify(settings.verticalJustify),
        setHasColor(settings.hasColor),
        setHasFillColor(settings.hasFillColor),
        setHasStrokeColor(settings.hasStrokeColor),
        setColor(settings.color),
        setFillColor(settings.fillColor),
        setStrokeColor(settings.strokeColor),
        setHasTextCase(settings.hasTextCase),
        setTextCase(settings.textCase),
        setHasLeading(settings.hasLeading),
        setLeading(settings.leading);
    }
  };

  useEffect(() => {
    loadSettings(true);
    loadColorList(true);
    loadProfiles(true);
  }, []);

  useEffect(() => {
    loadSettings(true, activeProfile);
  }, [activeProfile]);

  return (
    <Flex direction={"column"} alignSelf={"center"}>
      <Heading level={2}>SignAgent™ Tools</Heading>
      <ProfileBar
        activeProfile={activeProfile}
        setActiveProfile={setActiveProfile}
        profiles={profiles}
        setProfiles={setProfiles}
      />
      <Accordion allowsMultipleExpanded>
        <GettingStartedDisclosure />
        <JustificationDisclosure
          hasHorizontalJustify={hasHorizontalJustify}
          setHasHorizontalJustify={setHasHorizontalJustify}
          hasVerticalJustify={hasVerticalJustify}
          setHasVerticalJustify={setHasVerticalJustify}
          horizontalJustify={horizontalJustify}
          setHorizontalJustify={setHorizontalJustify}
          verticalJustify={verticalJustify}
          setVerticalJustify={setVerticalJustify}
        />
        <ColorDisclosure
          hasColor={hasColor}
          setHasColor={setHasColor}
          hasFillColor={hasFillColor}
          setHasFillColor={setHasFillColor}
          hasStrokeColor={hasStrokeColor}
          setHasStrokeColor={setHasStrokeColor}
          color={color}
          setColor={setColor}
          fillColor={fillColor}
          setFillColor={setFillColor}
          strokeColor={strokeColor}
          setStrokeColor={setStrokeColor}
          colorList={colorList}
          setColorList={setColorList}
        />
        <TextOptionsDisclosure
          hasTextCase={hasTextCase}
          setHasTextCase={setHasTextCase}
          textCase={textCase}
          setTextCase={setTextCase}
          hasLeading={hasLeading}
          setHasLeading={setHasLeading}
          leading={leading}
          setLeading={setLeading}
          leadingUnit={leadingUnit}
          setLeadingUnit={setLeadingUnit}
        />
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
                saveSettings(activeProfile);
                break;

              case "clearSelections":
                loadSettings();
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
          <Item key="clearSelections">
            <Erase size="S" marginStart={iconMarginAdjust} />
            <Text>Clear</Text>
          </Item>
        </ActionGroup>
        <Button
          variant="accent"
          onPress={() =>
            evalTS("renameSelectedPaths", "", formattingCommand, true)
              .catch((err) => {
                console.log(err);
                postToast("negative", err);
              })
              .then((result) => {
                console.log(result);
                result
                  ? postToast("positive", "Formatting command applied")
                  : postToast("negative", "Unable to apply formatting command");
              })
          }
        >
          Apply
        </Button>
      </Flex>
    </Flex>
  );
}
