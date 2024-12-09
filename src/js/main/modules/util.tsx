import { ToastQueue } from "@react-spectrum/toast";

export const toastTimeout: number = 1500;
export const toastTimeoutExtended: number = 2500;

export type UnitItem = {
  key: string;
  abbr: string;
};

export const UnitList: UnitItem[] = [
  { key: "inch", abbr: "in" },
  { key: "millimeter", abbr: "mm" },
  { key: "centimeter", abbr: "cm" },
  { key: "foot", abbr: "ft" },
  { key: "meter", abbr: "m" },
];

export function writeLocalStorage(key: string, value: any) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
    ToastQueue.positive("Saved Successfully", { timeout: toastTimeout });
  } catch (error) {
    if (error instanceof Error) {
      ToastQueue.negative(error.message, { timeout: toastTimeoutExtended });
    } else {
      ToastQueue.negative("Something went wrong when trying to save", {
        timeout: 1500,
      });
    }
  }
}

export function readLocalStorage(key: string, hideSuccess = false) {
  var storedData;
  try {
    storedData = localStorage.getItem(key);
  } catch (error) {
    if (error instanceof Error) {
      ToastQueue.negative(error.message, { timeout: toastTimeoutExtended });
    } else {
      ToastQueue.negative("Something went wrong when trying to load", {
        timeout: 1500,
      });
    }
  }
  if (storedData) {
    if (!hideSuccess) {
      ToastQueue.info("Loaded Successfully", {
        timeout: toastTimeout,
      });
    }

    return JSON.parse(storedData);
  } else {
    return storedData;
  }
}
