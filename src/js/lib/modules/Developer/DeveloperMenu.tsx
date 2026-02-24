import { ActionButton, Badge, Menu, MenuItem, MenuTrigger, SubmenuTrigger, Text } from "@react-spectrum/s2";
import Bug from "@react-spectrum/s2/icons/Bug";
import Delete from "@react-spectrum/s2/icons/Delete";
import RadioButton from '@react-spectrum/s2/icons/RadioButton';
import RotateCCW from "@react-spectrum/s2/icons/RotateCCW";
import { iconStyle, style } from "@react-spectrum/s2/style" with { type: "macro" };
import {
  getLocalStorageList,
  openLinkInBrowser,
  postToast
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
    <div className={style({
      display: "flex",
      flexDirection: "row",
      gap: 2,
    })}>
      <MenuTrigger align="end">
        <ActionButton isQuiet>
          {/* <Code styles={iconStyle({size: "S"})} /> */}
          <Badge variant="yellow">DEV</Badge>
          {/* <Text>Developer</Text> */}
        </ActionButton>
        <Menu onAction={(key) => handleAction(key.toString())}>
          <MenuItem id="reload">
            <RotateCCW styles={iconStyle({ size: "S" })} slot="icon" />
            <Text >Reload</Text>
          </MenuItem>
          <MenuItem id="openRemoteDebug">
            <Bug styles={iconStyle({ size: "S" })} slot="icon" />
            <Text >Remote Debug</Text>
          </MenuItem>
          <MenuItem id="openReactDebug">
            <Bug styles={iconStyle({ size: "S" })} slot="icon" />
            <Text >React Debug</Text>
          </MenuItem>
          <MenuItem id="clearStorage">
            <Delete styles={iconStyle({ size: "S" })} slot="icon" />
            <Text >
              Clear Storage [{getLocalStorageList().length}]
            </Text>
          </MenuItem>
          {/* <Item key="exportSettings">
            <Export styles={iconStyle({size: "S"})} slot="icon"  />
            <Text >Export Settings</Text>
          </Item> */}
          <SubmenuTrigger>
            <MenuItem>
              <RadioButton styles={iconStyle({ size: "S" })} slot="icon" />
              <Text >Toasts</Text>
            </MenuItem>
            <Menu onAction={(key) => handleAction(key.toString())}>
              <MenuItem id={"toastPositive"}>Positive</MenuItem>
              <MenuItem id={"toastNegative"}>Negative</MenuItem>
              <MenuItem id={"toastInfo"}>Information</MenuItem>
              <MenuItem id={"toastNeutral"}>Neutral</MenuItem>
            </Menu>
          </SubmenuTrigger>
        </Menu>
      </MenuTrigger>
    </div>
  );
};
