import {
  Accordion,
  ActionButton,
  Content,
  Dialog,
  DialogTrigger,
  Disclosure,
  DisclosurePanel,
  DisclosureTitle,
  Divider,
  Flex,
  Heading,
  Item,
  ListBox,
  Menu,
  MenuTrigger,
  SubmenuTrigger,
  Text,
} from "@adobe/react-spectrum";
import Bug from "@spectrum-icons/workflow/Bug";
import Code from "@spectrum-icons/workflow/Code";
import Delete from "@spectrum-icons/workflow/Delete";
import FileJson from "@spectrum-icons/workflow/FileJson";
import PushNotification from "@spectrum-icons/workflow/PushNotification";
import RotateCCWBold from "@spectrum-icons/workflow/RotateCCWBold";
import { getLogger } from "./";
import { openLinkInBrowser } from "../../../lib/utils/bolt";
import {
  componentGap,
  getLocalStorageLength,
  getLocalStorageList,
  iconMarginAdjust,
  menuIconMargin,
  menuTextMargin,
  postToast,
} from "../../utils";
import { useEffect, useState } from "react";

export const EnableDeveloperMode = true;

export const DeveloperMenu = () => {
  const [isLoggingEnabled, setIsLoggingEnabled] = useState(false);
  const [localStorageLength, setLocalStorageLength] = useState(0);
  const [localStorageList, setLocalStorageList] = useState([""]);
  const [logs, setLogs] = useState([""]);
  const logger = getLogger();

  useEffect(() => {
    const newLogs = logger.getLogs();
    const newIsLoggingEnabled = logger.isEnabled();
    const newLocalStorageLength = getLocalStorageLength();
    const newLocalStorageList = getLocalStorageList();

    if (logs != newLogs) {
      setLogs(newLogs);
    }
    if (isLoggingEnabled != newIsLoggingEnabled) {
      setIsLoggingEnabled(newIsLoggingEnabled);
    }
    if (localStorageLength != newLocalStorageLength) {
      setLocalStorageLength(newLocalStorageLength);
    }
    if (localStorageList != newLocalStorageList) {
      setLocalStorageList(newLocalStorageList);
    }
  }, []);

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

      case "toggleLogging":
        if (isLoggingEnabled) {
          logger.disableLogging();
          postToast("info", "Logging disabled");
        } else {
          logger.enableLogging();
          postToast("positive", "Logging enabled");
        }
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
          <Heading>Inspector</Heading>
          <Divider />
          <Content>
            <Accordion isQuiet>
              <Disclosure>
                <DisclosureTitle>Stored Files</DisclosureTitle>
                <DisclosurePanel>
                  <ListBox
                    items={localStorageList.map((filename) => ({
                      id: filename,
                      name: filename,
                    }))}
                  >
                    {(item) => <Item key={item.id}>{item.name}</Item>}
                  </ListBox>
                </DisclosurePanel>
              </Disclosure>
              <Disclosure>
                <DisclosureTitle>Internal Log</DisclosureTitle>
                <DisclosurePanel>
                  <pre>{logs}</pre>
                </DisclosurePanel>
              </Disclosure>
            </Accordion>
          </Content>
        </Dialog>
      </DialogTrigger>
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
              Clear Storage [{localStorageLength}]
            </Text>
          </Item>
          <Item key="toggleLogging">
            <Code size="S" slot="icon" margin={menuIconMargin} />
            <Text marginStart={menuTextMargin}>
              {isLoggingEnabled ? "Disable Logging" : "Enable Logging"}
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
