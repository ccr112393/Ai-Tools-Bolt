import {
  ActionButton,
  Flex,
  Item,
  Menu,
  MenuTrigger,
  SubmenuTrigger,
  Text,
  Tooltip,
  TooltipTrigger,
} from "@adobe/react-spectrum";
import Bug from "@spectrum-icons/workflow/Bug";
import Code from "@spectrum-icons/workflow/Code";
import Delete from "@spectrum-icons/workflow/Delete";
import PushNotification from "@spectrum-icons/workflow/PushNotification";
import RotateCCWBold from "@spectrum-icons/workflow/RotateCCWBold";
import { getLogger } from ".";
import { openLinkInBrowser } from "../../../lib/utils/bolt";
import {
  componentGap,
  getLocalStorageList,
  menuIconMargin,
  menuTextMargin,
  postToast,
  readLocalStorage,
} from "../../utils";
import Export from "@spectrum-icons/workflow/Export";

export const EnableDeveloperMode = true;

export const DeveloperMenu = () => {
  const logger = getLogger();

  function handleAction(action: string) {
    switch (action) {
      case "reload":
        window.location.reload();
        break;
      case "openRemoteDebug":
        openLinkInBrowser("http://localhost:8860/");
        break;
      case "openReactDebug":
        openLinkInBrowser("http://localhost:3000/main/index.html");

        break;
      case "toastPositive":
        postToast("positive", "Positive Toast!");
        logger.addLog("Positive Toast Test!");
        break;
      case "toastNegative":
        postToast("negative", "Negative Toast!");
        logger.addLog("Negative Toast Test!");
        break;
      case "toastInfo":
        postToast("info", "Information Toast!");
        logger.addLog("Information Toast Test!");
        break;
      case "toastNeutral":
        postToast("neutral", "Neutral Toast!");
        logger.addLog("Neutral Toast Test!");
        break;
      case "clearStorage":
        postToast(
          "info",
          `Removed [${localStorage.length}] files from local storage`
        );

        localStorage.clear();
        setTimeout(() => {
          window.location.reload();
        }, 250);
        break;

      case "exportSettings":
        // const fileList = getLocalStorageList();
        // const exportData: [fileName: string, fileContents: any] = ["", ""];
        // fileList.forEach((file) =>
        //   exportData.push({
        //     fileName: file,
        //     fileContents: readLocalStorage(file),
        //   })
        // );

        break;

      default:
        break;
    }
  }

  return (
    <Flex direction="row" gap={componentGap}>
      {/* <Inspector /> */}
      <MenuTrigger align="end">
        <ActionButton>
          <Code size="S" />
          {/* <Text>Developer</Text> */}
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
          <Item key="openReactDebug">
            <Bug size="S" slot="icon" margin={menuIconMargin} />
            <Text marginStart={menuTextMargin}>React Debug</Text>
          </Item>
          <Item key="clearStorage">
            <Delete size="S" slot="icon" margin={menuIconMargin} />
            <Text marginStart={menuTextMargin}>
              Clear Storage [{getLocalStorageList().length}]
            </Text>
          </Item>
          <Item key="exportSettings">
            <Export size="S" slot="icon" margin={menuIconMargin} />
            <Text marginStart={menuTextMargin}>Export Settings</Text>
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
