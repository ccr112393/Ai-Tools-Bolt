import { Flex, ActionGroup, Item, Button, Text } from "@adobe/react-spectrum";
import { evalTS } from "../../../../lib/utils/bolt";
import { iconMarginAdjust, postToast } from "../../../utils";
import { useRegistration } from "../contexts/RegistrationContext";
import { getLogger } from "../../Developer";
import SaveFloppy from "@spectrum-icons/workflow/SaveFloppy";
import Import from "@spectrum-icons/workflow/Import";

export function RegistrationActionBar() {
  const logger = getLogger();
  const { registrationSettings, loadSettings, saveSettings } =
    useRegistration();
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
          <SaveFloppy size="S" marginStart={iconMarginAdjust} />
          <Text>Save Settings</Text>
        </Item>
        <Item key="load">
          <Import size="S" marginStart={iconMarginAdjust} />
          <Text>Load Settings</Text>
        </Item>
      </ActionGroup>
      <Button
        variant="accent"
        onPress={() => {
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
              logger.addLog(err);
              postToast("negative", err);
            })
            .then((result) => {
              result
                ? postToast("positive", "Registration Applied")
                : postToast("negative", "Unable to apply registration");
            });
        }}
      >
        Apply
      </Button>
    </Flex>
  );
}
