import { ActionButton, Tooltip, TooltipTrigger } from "@react-spectrum/s2";
import RotateCCW from "@react-spectrum/s2/icons/RotateCCW";

export const ReloadButton = () => {
  return (
    <TooltipTrigger>
      <ActionButton
        key="reload"
        isQuiet
        onPress={() => window.location.reload()}
      >
        <RotateCCW size="S" />
      </ActionButton>
      <Tooltip>Reload</Tooltip>
    </TooltipTrigger>
  );
};
