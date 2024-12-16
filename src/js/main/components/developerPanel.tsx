import {
  ActionButton,
  ActionGroup,
  Content,
  Dialog,
  DialogTrigger,
  Divider,
  Flex,
  Heading,
  Item,
  Text,
} from "@adobe/react-spectrum";
import RotateCCWBold from "@spectrum-icons/workflow/RotateCCWBold";
import {
  componentGap,
  componentWidth,
  iconMarginAdjust,
  postToast,
} from "../modules";
import Code from "@spectrum-icons/workflow/Code";

export const EnableDeveloperMode = true;

function handleAction(action: string) {
  switch (action) {
    case "reload":
      window.location.reload();
      break;

    default:
      break;
  }
}

export const DeveloperPanel = () => {
  return (
    <DialogTrigger type="popover" placement="bottom end">
      <ActionButton key="reload">
        <Code size="S" />
      </ActionButton>
      <Dialog size="S" maxWidth={componentWidth}>
        <Heading>Developer Menu</Heading>
        <Divider />
        <Content>
          <ActionGroup onAction={(action) => handleAction(action.toString())}>
            <Item key={"reload"}>
              <RotateCCWBold size="M" marginStart={iconMarginAdjust} />
              <Text>Reload</Text>
            </Item>
          </ActionGroup>
        </Content>
      </Dialog>
    </DialogTrigger>
  );
};

export const ReloadButton = () => {
  return (
    <ActionButton key="reload" isQuiet onPress={() => window.location.reload()}>
      <RotateCCWBold size="M" marginStart={iconMarginAdjust} />
      <Text>Reload</Text>
    </ActionButton>
  );
};
