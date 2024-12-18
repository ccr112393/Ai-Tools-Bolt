import {
  ActionButton,
  Item,
  Menu,
  MenuTrigger,
  SubmenuTrigger,
  Text,
} from "@adobe/react-spectrum";
import Bug from "@spectrum-icons/workflow/Bug";
import Code from "@spectrum-icons/workflow/Code";
import PushNotification from "@spectrum-icons/workflow/PushNotification";
import RotateCCWBold from "@spectrum-icons/workflow/RotateCCWBold";
import { openLinkInBrowser } from "../../lib/utils/bolt";
import {
  iconMarginAdjust,
  menuIconMargin,
  menuTextMargin,
  postToast,
} from "../modules";

export const EnableDeveloperMode = true;

function handleAction(action: string) {
  switch (action) {
    case "reload":
      window.location.reload();
      break;
    case "openRemoteDebug":
      openLinkInBrowser("http://localhost:8860/");
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
        <Item key="openRemoteDebug">
          <Bug size="S" slot="icon" margin={menuIconMargin} />
          <Text marginStart={menuTextMargin}>Remote Debug</Text>
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
