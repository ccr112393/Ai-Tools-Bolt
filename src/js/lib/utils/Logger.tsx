import { EventEmitter } from "events";

// logger.ts
const LogKey = "ait_log";
const LogEnableKey = "ait_log_enabled";
class Logger {
  private logs: string[] = [];
  private sessionLogs: string[] = [];
  private shouldStoreLogs: boolean = false;

  constructor() {
    const loggingEnabled = localStorage.getItem(LogEnableKey);
    this.shouldStoreLogs = loggingEnabled === "true";
    if (loggingEnabled) {
      const storedLogs = localStorage.getItem(LogKey);
      if (storedLogs) {
        this.logs = JSON.parse(storedLogs);
      }
    }
  }

  addLog(message: string): void {
    if (this.shouldStoreLogs) {
      this.logs.push(message + "\n");
      // Sync with localStorage
      localStorage.setItem(LogKey, JSON.stringify(this.logs));
    }
    this.sessionLogs.push(message + "\n");
    console.log(message);
  }

  deleteStoredLog(): void {
    localStorage.removeItem(LogKey);
  }

  getLogs(): string[] {
    return this.logs;
  }

  getSessionLogs(): string[] {
    return this.sessionLogs;
  }

  setShouldStoreLogs(shouldStore: boolean): void {
    this.shouldStoreLogs = shouldStore;

    if (!shouldStore) {
      this.deleteStoredLog();
    } else {
    }

    localStorage.setItem(LogEnableKey, shouldStore ? "true" : "false");
  }

  isStored(): boolean {
    return this.shouldStoreLogs;
  }

  getLoggerStatus(): {
    isStored: boolean;
    sessionLogs: string[];
    logs: string[];
  } {
    return {
      isStored: this.isStored(),
      sessionLogs: this.getSessionLogs(),
      logs: this.getLogs(),
    };
  }
}

let loggerInstance: Logger | null = null;

export function getLogger(): Logger {
  if (!loggerInstance) {
    loggerInstance = new Logger();
  }
  return loggerInstance;
}
