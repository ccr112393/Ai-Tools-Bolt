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

export function logCaughtError(caughtError: TypeError, customMessage?: string) {
  let message = "--- CAUGHT ERROR ---\n\n";
  if (customMessage) {
    message += customMessage + "\n\n";
  }
  console.log(message + caughtError.message);
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

export function getLocalStorageList(
  postToast?: (
    style: "positive" | "negative" | "info" | "neutral",
    message: string
  ) => void,
  showSuccess = false
): string[] {
  let fileList: string[] = [];
  try {
    for (let i = 0; i < getLocalStorageLength(); i++) {
      fileList.push(localStorage.key(i) || "");
    }
    if (showSuccess && postToast) {
      postToast("positive", "Loaded File List: " + fileList.length + fileList);
    }
  } catch (error) {
    if (postToast) {
      error instanceof Error
        ? postToast("negative", error.message)
        : postToast(
            "negative",
            "Something went wrong trying to read local storage"
          );
    }
  }
  return fileList;
}

export function getLocalStorageProfiles(
  postToast?: (
    style: "positive" | "negative" | "info" | "neutral",
    message: string
  ) => void,
  showSuccess = false
): string[] {
  let fileList: string[] = [];
  let fileCount = getLocalStorageLength();
  try {
    for (let i = 0; i < fileCount; i++) {
      let key = localStorage.key(i) || "";
      if (key.includes(ProfileKey)) {
        fileList.push(key);
      }
    }
    if (showSuccess && postToast) {
      postToast(
        "positive",
        "Loaded Profile List: " + fileList.length + fileList
      );
    }
  } catch (error) {
    if (postToast) {
      error instanceof Error
        ? postToast("negative", error.message)
        : postToast(
            "negative",
            "Something went wrong trying to load stored profiles"
          );
    }
  }

  return fileList;
}

export function writeLocalStorage(
  key: string,
  value: any,

  postToast?: (
    style: "positive" | "negative" | "info" | "neutral",
    message: string
  ) => void,
  showSuccess = false
) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
    if (showSuccess && postToast) {
      postToast("positive", `Saved ${key} successfully`);
    }
  } catch (error) {
    if (postToast) {
      if (error instanceof Error) {
        postToast("negative", error.message);
      } else {
        postToast("negative", "Something went wrong trying to save");
      }
    }
  }
}

export function readLocalStorage(
  key: string,

  postToast?: (
    style: "positive" | "negative" | "info" | "neutral",
    message: string
  ) => void,
  showSuccess = false
) {
  var storedData;
  try {
    storedData = localStorage.getItem(key);
  } catch (error) {
    if (postToast) {
      if (error instanceof Error) {
        postToast("negative", error.message);
      } else {
        postToast("negative", "Something went wrong trying to load");
      }
    }
  }
  if (storedData) {
    if (showSuccess && postToast) {
      postToast("info", "Loaded successfully");
    }

    return JSON.parse(storedData);
  } else {
    return storedData;
  }
}

export function deleteLocalStorage(
  key: string,

  postToast?: (
    style: "positive" | "negative" | "info" | "neutral",
    message: string
  ) => void,
  showSuccess = false
) {
  try {
    localStorage.removeItem(key);
    if (showSuccess && postToast) {
      postToast("positive", `Deleted ${key} successfully`);
    }
  } catch (error) {
    if (postToast) {
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
}

export function formatFieldName(fieldName: string): string {
  return fieldName
    .toLowerCase()
    .replace(/\s+/g, "_")
    .replace(/[^a-zA-Z0-9]/g, "");
}
