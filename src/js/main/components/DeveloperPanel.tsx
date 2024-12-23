import {
  ActionButton,
  Content,
  Dialog,
  DialogTrigger,
  Divider,
  Flex,
  Heading,
  Item,
  Menu,
  MenuTrigger,
  SubmenuTrigger,
  Text,
  TextArea,
} from "@adobe/react-spectrum";
import Bug from "@spectrum-icons/workflow/Bug";
import Code from "@spectrum-icons/workflow/Code";
import Delete from "@spectrum-icons/workflow/Delete";
import FileJson from "@spectrum-icons/workflow/FileJson";
import PushNotification from "@spectrum-icons/workflow/PushNotification";
import RotateCCWBold from "@spectrum-icons/workflow/RotateCCWBold";
import { useState } from "react";
import { openLinkInBrowser } from "../../lib/utils/bolt";
import { useLog } from "../contexts/LogContext";
import {
  componentGap,
  getLocalStorageLength,
  iconMarginAdjust,
  menuIconMargin,
  menuTextMargin,
  postToast,
} from "../modules";

export const EnableDeveloperMode = true;

export const DeveloperMenu = () => {
  const [storageCount, setStorageCount] = useState(localStorage.length);
  const { internalLog, appLog } = useLog();

  function handleAction(action: string) {
    switch (action) {
      case "reload":
        window.location.reload();
        break;
      case "openRemoteDebug":
        openLinkInBrowser("http://localhost:8860/");
        break;
      case "toastPositive":
        postToast("positive", "Positive Toast!", appLog);
        break;
      case "toastNegative":
        postToast("negative", "Negative Toast!", appLog);
        break;
      case "toastInfo":
        postToast("info", "Information Toast!", appLog);
        break;
      case "toastNeutral":
        postToast("neutral", "Neutral Toast!", appLog);
        break;
      case "clearStorage":
        postToast("info", `Clearing local storage...[${localStorage.length}]`);

        localStorage.clear();
        setTimeout(() => {
          window.location.reload();
        }, 250);
        break;
      default:
        break;
    }
  }

  return (
    <Flex direction="row" gap={componentGap}>
      <DialogTrigger isDismissable>
        <ActionButton>
          <FileJson size="S" />
          {/* <Text>Log</Text> */}
        </ActionButton>
        <Dialog>
          <Heading>Internal Log</Heading>
          <Divider />
          <Content>
            <pre>{internalLog}</pre>
          </Content>
        </Dialog>
      </DialogTrigger>
      <MenuTrigger>
        <ActionButton onPress={() => setStorageCount(getLocalStorageLength())}>
          <Code size="S" />
          {/* <Text>Developer</Text> */}
        </ActionButton>
        <Menu onAction={(key) => handleAction(key.toString())}>
          <Item key="reload">
            <RotateCCWBold size="M" slot="icon" margin={menuIconMargin} />
            <Text marginStart={menuTextMargin}>Reload</Text>
          </Item>
          <Item key="openRemoteDebug">
            <Bug size="S" slot="icon" margin={menuIconMargin} />
            <Text marginStart={menuTextMargin}>Remote Debug</Text>
          </Item>
          <Item key="clearStorage">
            <Delete size="S" slot="icon" margin={menuIconMargin} />
            <Text marginStart={menuTextMargin}>
              Clear Storage [{storageCount}]
            </Text>
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
    </Flex>
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
