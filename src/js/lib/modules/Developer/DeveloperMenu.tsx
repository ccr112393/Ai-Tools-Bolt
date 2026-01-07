import {
  ActionButton,
  Badge,
  Flex,
  Item,
  Menu,
  MenuTrigger,
  SubmenuTrigger,
  Text,
} from "@adobe/react-spectrum";
import Bug from "@spectrum-icons/workflow/Bug";
import Code from "@spectrum-icons/workflow/Code";
import Delete from "@spectrum-icons/workflow/Delete";
import Export from "@spectrum-icons/workflow/Export";
import PushNotification from "@spectrum-icons/workflow/PushNotification";
import RotateCCWBold from "@spectrum-icons/workflow/RotateCCWBold";
import {
  componentGap,
  getLocalStorageList,
  menuIconMargin,
  menuTextMargin,
  openLinkInBrowser,
  postToast,
} from "../../utils";


export const DeveloperMenu = () => {
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
        console.log("Positive Toast Test!");
        break;
      case "toastNegative":
        postToast("negative", "Negative Toast!");
        console.log("Negative Toast Test!");
        break;
      case "toastInfo":
        postToast("info", "Information Toast!");
        console.log("Information Toast Test!");
        break;
      case "toastNeutral":
        postToast("neutral", "Neutral Toast!");
        console.log("Neutral Toast Test!");
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
      <MenuTrigger align="end">
        <ActionButton isQuiet>
          {/* <Code size="S" /> */}
          <Badge variant="yellow">DEV</Badge>
          {/* <Text>Developer</Text> */}
        </ActionButton>
        <Menu onAction={(key) => handleAction(key.toString())}>
          <Item key="reload">
            <RotateCCWBold size="S" slot="icon" />
            <Text >Reload</Text>
          </Item>
          <Item key="openRemoteDebug">
            <Bug size="S" slot="icon" />
            <Text >Remote Debug</Text>
          </Item>
          <Item key="openReactDebug">
            <Bug size="S" slot="icon" />
            <Text >React Debug</Text>
          </Item>
          <Item key="clearStorage">
            <Delete size="S" slot="icon" />
            <Text >
              Clear Storage [{getLocalStorageList().length}]
            </Text>
          </Item>
          {/* <Item key="exportSettings">
            <Export size="S" slot="icon"  />
            <Text >Export Settings</Text>
          </Item> */}
          <SubmenuTrigger>
            <Item>
              <PushNotification size="S" slot="icon" />
              <Text >Toasts</Text>
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
