import { ActionButtonGroup, ActionButton, Button, Text, TooltipTrigger, Tooltip } from "@react-spectrum/s2";
import { iconStyle, style } from "@react-spectrum/s2/style" with { type: "macro" };
import { evalTS } from "../../../utils/bolt";
import { iconMarginAdjust, postToast } from "../../../utils";
import { useRegistration } from "../contexts/RegistrationContext";
import SaveFloppy from "@react-spectrum/s2/icons/SaveFloppy";
import Import from "@react-spectrum/s2/icons/Import";

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
    <div
      className={style({
        display: "flex",
        justifyContent: "space-between",
        marginTop: 16
      })}>
      <ActionButtonGroup>
        <ActionButton
          key="save"
          onPress={() => ((key: React.Key) => {
            switch (key) {
              case "load":
                loadSettings();
                break;
              case "save":
                saveSettings();

              default:
                break;
            }
          })("save")}>
          <SaveFloppy styles={iconStyle({ size: 'S' })} />
          <Text>Save Settings</Text>
        </ActionButton>
        <ActionButton
          key="load"
          onPress={() => ((key: React.Key) => {
            switch (key) {
              case "load":
                loadSettings();
                break;
              case "save":
                saveSettings();

              default:
                break;
            }
          })("load")}>
          <Import styles={iconStyle({ size: 'S' })} />
          <Text>Load Saved Settings</Text>
        </ActionButton>
      </ActionButtonGroup>
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
    </div>
  );
}
