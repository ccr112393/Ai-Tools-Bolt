import { ProfileKey } from "../modules";
import { postToast } from "./ToastNotification";

export function getLocalStorageLength(): number {
  return localStorage.length || 0;
}

export function getLocalStorageList(): string[] {
  let logMsg = "";
  let fileList: string[] = [];
  try {
    for (let i = 0; i < getLocalStorageLength(); i++) {
      fileList.push(localStorage.key(i) || "");
    }

    // logMsg = `Found ${fileList.length} files`;
  } catch (error) {
    error instanceof Error
      ? (logMsg = error.message)
      : (logMsg = "Something went wrong trying to read local storage");
  }
  console.log(logMsg);
  return fileList;
}

export function getLocalStorageProfiles(): string[] {
  let fileList: string[] = [];
  let fileCount = getLocalStorageLength();
  try {
    for (let i = 0; i < fileCount; i++) {
      let key = localStorage.key(i) || "";
      if (key.includes(ProfileKey)) {
        fileList.push(key);
      }
    }
    // console.log(`Found ${fileCount} Profiles`);
  } catch (error) {
    error instanceof Error
      ? console.log(error.message)
      : console.log("Something went wrong trying to load stored profiles");
  }
  return fileList;
}

export function writeLocalStorage(key: string, value: any): boolean {
  let success = false;
  let logMsg = "";
  try {
    localStorage.setItem(key, JSON.stringify(value));
    logMsg = `${key} Saved successfully`;
    success = true;
    // showSuccess ? postToast("positive", logMsg) : null;
  } catch (error) {
    error instanceof Error
      ? (logMsg = error.message)
      : (logMsg = `Something went wrong saving ${key}`);
    postToast("negative", logMsg);
  }
  console.log(logMsg);
  return success;
}

export function readLocalStorage(key: string) {
  let logMsg = "";
  let storedData;
  try {
    storedData = localStorage.getItem(key);
    if (storedData) {
      logMsg = `${key} Loaded successfully`;
      // showSuccess ? postToast("positive", logMsg) : null;
    } else {
      logMsg = `${key} Not found`;
      // showSuccess ? postToast("info", logMsg) : null;
    }
  } catch (error) {
    error instanceof Error
      ? (logMsg = error.message)
      : (logMsg = `Something went wrong trying to load ${key} from local storage`);
    postToast("negative", logMsg);
  }
  console.log(logMsg);
  return storedData ? JSON.parse(storedData) : storedData;
}

export function deleteLocalStorage(key: string) {
  let logMsg = "";
  try {
    localStorage.removeItem(key);
    logMsg = `${key} Deleted successfully`;
    // showSuccess ? postToast("positive", logMsg) : null;
  } catch (error) {
    error instanceof Error
      ? (logMsg = error.message)
      : (logMsg = "Something went wrong trying to delete from storage");
    postToast("negative", logMsg);
  }
  console.log(logMsg);
}
