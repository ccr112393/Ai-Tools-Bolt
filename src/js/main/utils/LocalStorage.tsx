import { ProfileKey } from "../modules";
import { getLogger } from "../modules/Developer";
import { postToast } from "./ToastNotification";

interface LocalStorageProps {
  (key: string, options?: { showSuccess: true }): void;
}

interface WriteLocalStorageProps {
  (key: string, value: any, options?: { showSuccess?: true }): void;
}

interface ReadLocalStorageProps {
  (key: string, options?: { showSuccess?: true }): any | null;
}

export function getLocalStorageLength(): number {
  return localStorage.length || 0;
}

export function getLocalStorageList(): string[] {
  const logger = getLogger();
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
  logger.addLog(logMsg);
  return fileList;
}

export function getLocalStorageProfiles(): string[] {
  const logger = getLogger();
  let fileList: string[] = [];
  let fileCount = getLocalStorageLength();
  try {
    for (let i = 0; i < fileCount; i++) {
      let key = localStorage.key(i) || "";
      if (key.includes(ProfileKey)) {
        fileList.push(key);
      }
    }
    // logger.addLog(`Found ${fileCount} Profiles`);
  } catch (error) {
    error instanceof Error
      ? logger.addLog(error.message)
      : logger.addLog("Something went wrong trying to load stored profiles");
  }
  return fileList;
}

export const writeLocalStorage: WriteLocalStorageProps = (
  key: string,
  value: any,
  { showSuccess }: { showSuccess?: true } = {}
) => {
  const logger = getLogger();
  let logMsg = "";
  try {
    localStorage.setItem(key, JSON.stringify(value));
    logMsg = `Saved ${key} successfully`;
    showSuccess ? postToast("positive", logMsg) : null;
  } catch (error) {
    error instanceof Error
      ? (logMsg = error.message)
      : (logMsg = `Something went wrong saving ${key}`);
    postToast("negative", logMsg);
  }
  logger.addLog(logMsg);
};

export const readLocalStorage: ReadLocalStorageProps = (
  key: string,
  { showSuccess }: { showSuccess?: true } = {}
) => {
  const logger = getLogger();
  let logMsg = "";
  let storedData;
  try {
    storedData = localStorage.getItem(key);
    if (storedData) {
      logMsg = `Loaded stored ${key} successfully`;
      showSuccess ? postToast("positive", logMsg) : null;
    } else {
      logMsg = `Found stored ${key}, but no data`;
      showSuccess ? postToast("info", logMsg) : null;
    }
  } catch (error) {
    error instanceof Error
      ? (logMsg = error.message)
      : (logMsg = `Something went wrong trying to load ${key} from local storage`);
    postToast("negative", logMsg);
  }
  logger.addLog(logMsg);
  return storedData ? JSON.parse(storedData) : storedData;
};

export const deleteLocalStorage: LocalStorageProps = (
  key: string,
  { showSuccess }: { showSuccess?: true } = {}
) => {
  const logger = getLogger();
  let logMsg = "";
  try {
    localStorage.removeItem(key);
    logMsg = `Deleted ${key} successfully`;
    showSuccess ? postToast("positive", logMsg) : null;
  } catch (error) {
    error instanceof Error
      ? (logMsg = error.message)
      : (logMsg = "Something went wrong trying to delete from storage");
    postToast("negative", logMsg);
  }
  logger.addLog(logMsg);
};
