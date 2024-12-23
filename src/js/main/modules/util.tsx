import { ToastQueue } from "@react-spectrum/toast";
import { ProfileKey } from "../modules";

export const toastTimeout: number = 1500;
export const toastTimeoutExtended: number = 2500;
export const componentWidth: string = "size-1700";
export const componentWidth3Quarters: string = "size-1200";
export const componentWidthHalf: string = "size-800";
export const componentGap: string = "size-100";
export const componentGapDouble: string = "size-200";
export const menuIconMargin: string = "size-75";
export const menuTextMargin: string = "size-250";
export const iconMarginAdjust: number = 6.5;

// All Functions with Try Catch Blocks have optional hideSuccess
// parameter to suppress success messages, default is true

export function logCaughtError(caughtError: TypeError, customMessage?: string) {
  let message = "--- CAUGHT ERROR ---\n\n";
  if (customMessage) {
    message += customMessage + "\n\n";
  }
  console.log(message + caughtError.message);
}

export function postToast(
  style: "positive" | "negative" | "info" | "neutral",
  message: string,
  appLog?: (message: string, header?: string) => void
) {
  if (appLog) {
    appLog(message, style.toUpperCase());
  }

  switch (style) {
    case "positive":
      ToastQueue.positive(message, { timeout: toastTimeout });
      break;
    case "negative":
      ToastQueue.negative(message, { timeout: toastTimeoutExtended });
      break;
    case "info":
      ToastQueue.info(message, { timeout: toastTimeout });
      break;
    default:
      ToastQueue.neutral(message, { timeout: toastTimeout });
      break;
  }
}

export type UnitItem = {
  key: string;
  abbr: string;
  name: string;
};

export const UnitList: UnitItem[] = [
  { key: "inch", abbr: "in", name: "Inches" },
  { key: "millimeter", abbr: "mm", name: "Millimeters" },
  { key: "centimeter", abbr: "cm", name: "Centimeters" },
  { key: "foot", abbr: "ft", name: "Feet" },
  { key: "meter", abbr: "m", name: "Meters" },
  { key: "pixel", abbr: "px", name: "Pixels" },
  { key: "point", abbr: "pt", name: "Points" },
];

export function getLocalStorageLength(): number {
  return localStorage.length || 0;
}

export function getLocalStorageList(showSuccess = false): string[] {
  let fileList: string[] = [];
  try {
    for (let i = 0; i < getLocalStorageLength(); i++) {
      fileList.push(localStorage.key(i) || "");
    }
    if (showSuccess) {
      postToast("positive", "Loaded File List: " + fileList.length + fileList);
    }
  } catch (error) {
    error instanceof Error
      ? postToast("negative", error.message)
      : postToast(
          "negative",
          "Something went wrong trying to read local storage"
        );
  }
  return fileList;
}

export function getLocalStorageProfiles(showSuccess = false): string[] {
  let fileList: string[] = [];
  let fileCount = getLocalStorageLength();
  try {
    for (let i = 0; i < fileCount; i++) {
      let key = localStorage.key(i) || "";
      if (key.includes(ProfileKey)) {
        fileList.push(key);
      }
    }
    if (showSuccess) {
      postToast(
        "positive",
        "Loaded Profile List: " + fileList.length + fileList
      );
    }
  } catch (error) {
    error instanceof Error
      ? postToast("negative", error.message)
      : postToast(
          "negative",
          "Something went wrong trying to load stored profiles"
        );
  }

  return fileList;
}

export function writeLocalStorage(
  key: string,
  value: any,
  showSuccess = false
) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
    if (showSuccess) {
      postToast("positive", `Saved ${key} successfully`);
    }
  } catch (error) {
    if (error instanceof Error) {
      postToast("negative", error.message);
    } else {
      postToast("negative", "Something went wrong trying to save");
    }
  }
}

export function readLocalStorage(key: string, showSuccess = false) {
  var storedData;
  try {
    storedData = localStorage.getItem(key);
  } catch (error) {
    if (error instanceof Error) {
      postToast("negative", error.message);
    } else {
      postToast("negative", "Something went wrong trying to load");
    }
  }
  if (storedData) {
    if (showSuccess) {
      postToast("info", "Loaded successfully");
    }

    return JSON.parse(storedData);
  } else {
    return storedData;
  }
}

export function deleteLocalStorage(key: string, showSuccess = false) {
  try {
    localStorage.removeItem(key);
    if (showSuccess) {
      postToast("positive", `Deleted ${key} successfully`);
    }
  } catch (error) {
    if (error instanceof Error) {
      postToast("negative", error.message);
    } else {
      postToast(
        "negative",
        "Something went wrong trying to delete from storage"
      );
    }
  }
}

export function formatFieldName(fieldName: string): string {
  return fieldName.toLowerCase().replace(/\s+/g, "_");
}
