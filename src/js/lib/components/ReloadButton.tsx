import { ActionButton, Tooltip, TooltipTrigger } from "@adobe/react-spectrum";
import RotateCCWBold from "@spectrum-icons/workflow/RotateCCWBold";

export const ReloadButton = () => {
  return (
    <TooltipTrigger>
      <ActionButton
        key="reload"
        isQuiet
        onPress={() => window.location.reload()}
      >
        <RotateCCWBold size="S" />
      </ActionButton>
      <Tooltip>Reload</Tooltip>
    </TooltipTrigger>
  );
};
