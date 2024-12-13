import { ToastQueue } from "@react-spectrum/toast";

export const toastTimeout: number = 1500;
export const toastTimeoutExtended: number = 2500;

export function postToast(
  style: "positive" | "negative" | "info" | "neutral",
  message: string
) {
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

export function writeLocalStorage(key: string, value: any) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
    postToast("positive", "Saved successfully");
  } catch (error) {
    if (error instanceof Error) {
      postToast("negative", error.message);
    } else {
      postToast("negative", "Something went wrong when trying to save");
    }
  }
}

export function readLocalStorage(key: string, hideSuccess = false) {
  var storedData;
  try {
    storedData = localStorage.getItem(key);
  } catch (error) {
    if (error instanceof Error) {
      postToast("negative", error.message);
    } else {
      postToast("negative", "Something went wrong when trying to load");
    }
  }
  if (storedData) {
    if (!hideSuccess) {
      postToast("info", "Loaded successfully");
    }

    return JSON.parse(storedData);
  } else {
    return storedData;
  }
}
