import {
  Flex,
  ActionGroup,
  Item,
  Button,
  Text,
  TooltipTrigger,
  Tooltip,
} from "@adobe/react-spectrum";
import { evalTS } from "../../../utils/bolt";
import { iconMarginAdjust, postToast } from "../../../utils";
import { useRegistration } from "../contexts/RegistrationContext";
import SaveFloppy from "@spectrum-icons/workflow/SaveFloppy";
import Import from "@spectrum-icons/workflow/Import";

export function RegistrationActionBar() {
  const { registrationSettings, loadSettings, saveSettings, invalidSettings } =
    useRegistration();

  const handleAddRegistration = () => {
    evalTS(
      "addRegistration",
      registrationSettings.layerName,
      registrationSettings.unit,
      registrationSettings.diameter,
      registrationSettings.edgeOffset,
      registrationSettings.marksPrimary,
      registrationSettings.marksOrientation,
      registrationSettings.marksOrientationLocation,
      registrationSettings.marksCenter,
      registrationSettings.marksDistance,
      registrationSettings.marksDistanceValue
    )
      .catch((err) => {
        console.log(err);
        postToast("negative", err);
      })
      .then((result) => {
        result
          ? postToast("positive", "Registration Applied")
          : postToast("negative", "Unable to apply registration");
      });
  };

  return (
    <Flex justifyContent={"space-between"} marginTop={"size-200"}>
      <ActionGroup
        overflowMode="collapse"
        buttonLabelBehavior="hide"
        onAction={(key: React.Key) => {
          switch (key) {
            case "load":
              loadSettings();
              break;
            case "save":
              saveSettings();

            default:
              break;
          }
        }}
      >
        <Item key="save">
          <SaveFloppy size="S" />
          <Text>Save Settings</Text>
        </Item>
        <Item key="load">
          <Import size="S" />
          <Text>Load Saved Settings</Text>
        </Item>
      </ActionGroup>
      <TooltipTrigger>
        <Button
          isDisabled={invalidSettings.length >= 1 ? true : false}
          variant="accent"
          onPress={() => {
            handleAddRegistration();
          }}
        >
          Apply
        </Button>
        <Tooltip>
          Tip: You can undo this by using Illustrator's Undo fuction (Ctrl+Z or
          Cmd+Z).
        </Tooltip>
      </TooltipTrigger>
    </Flex>
  );
}
