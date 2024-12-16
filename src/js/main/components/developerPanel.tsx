import {
  ActionButton,
  ActionGroup,
  Content,
  Dialog,
  DialogTrigger,
  Divider,
  Heading,
  Item,
  Menu,
  MenuTrigger,
  SubmenuTrigger,
  Text,
} from "@adobe/react-spectrum";
import Code from "@spectrum-icons/workflow/Code";
import RotateCCWBold from "@spectrum-icons/workflow/RotateCCWBold";
import {
  componentWidth,
  iconMarginAdjust,
  menuIconMargin,
  menuTextMargin,
  postToast,
} from "../modules";
import PushNotification from "@spectrum-icons/workflow/PushNotification";

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

export const DeveloperMenu = () => {
  return (
    <MenuTrigger>
      <ActionButton>
        <Code size="S" />
      </ActionButton>
      <Menu onAction={(key) => handleAction(key.toString())}>
        <Item key="reload">
          <RotateCCWBold size="S" slot="icon" margin={menuIconMargin} />
          <Text marginStart={menuTextMargin}>Reload</Text>
        </Item>
        <SubmenuTrigger>
          <Item>
            <PushNotification size="S" slot="icon" margin={menuIconMargin} />
            <Text marginStart={menuTextMargin}>Toasts</Text>
          </Item>
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
