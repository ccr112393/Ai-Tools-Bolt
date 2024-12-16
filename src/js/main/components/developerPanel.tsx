import {
  ActionButton,
  Content,
  Dialog,
  DialogTrigger,
  Heading,
  Text,
} from "@adobe/react-spectrum";
import RotateCCWBold from "@spectrum-icons/workflow/RotateCCWBold";
import { componentWidth, iconMarginAdjust } from "../modules";

export const EnableDeveloperMode = true;

export const DeveloperPanel = () => {
  return (
    <DialogTrigger type="popover" placement="bottom end">
      <ActionButton key="reload" isQuiet>
        <RotateCCWBold size="M" marginStart={iconMarginAdjust} />
        <Text>Debug Options</Text>
      </ActionButton>
      <Dialog size="S" maxWidth={componentWidth}>
        <Heading>Debug Menu</Heading>
        <Content>
          <ReloadButton />
        </Content>
      </Dialog>
    </DialogTrigger>
  );
};

export const ReloadButton = () => {
  return (
    <ActionButton key="reload" isQuiet>
      <RotateCCWBold size="M" marginStart={iconMarginAdjust} />
      <Text>Reload</Text>
    </ActionButton>
  );
};
