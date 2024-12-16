import {
  ActionButton,
  ActionGroup,
  ActionMenu,
  Content,
  Dialog,
  DialogTrigger,
  Divider,
  Flex,
  Heading,
  Item,
  Keyboard,
  Menu,
  MenuTrigger,
  Section,
  SubmenuTrigger,
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
import Copy from "@spectrum-icons/workflow/Copy";

export const EnableDeveloperMode = true;

function handleAction(action: string) {
  switch (action) {
    case "reload":
      window.location.reload();
      break;
    case "toastPositive":
      postToast("positive", "Positive Toast!");
      break;
    case "toastNegative":
      postToast("negative", "Negative Toast!");
      break;
    case "toastInfo":
      postToast("info", "Information Toast!");
      break;
    case "toastNeutral":
      postToast("neutral", "Neutral Toast!");
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

export const DeveloperMenu = () => {
  return (
    <MenuTrigger>
      <ActionButton>
        <Code size="S" />
      </ActionButton>
      <Menu onAction={(key) => handleAction(key.toString())}>
        <Item key="reload">Reload</Item>
        <SubmenuTrigger>
          <Item>Toasts</Item>
          <Menu onAction={(key) => handleAction(key.toString())}>
            <Item key={"toastPositive"}>Positive</Item>
            <Item key={"toastNegative"}>Negative</Item>
            <Item key={"toastInfo"}>Information</Item>
            <Item key={"toastNeutral"}>Neutral</Item>
          </Menu>
        </SubmenuTrigger>
      </Menu>
    </MenuTrigger>
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
