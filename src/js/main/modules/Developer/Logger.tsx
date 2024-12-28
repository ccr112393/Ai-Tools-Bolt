// logger.ts
const LogKey = "ait_log";
const LogEnabledKey = "ait_log_enabled";
class Logger {
  private logs: string[] = [];
  private sessionLogs: string[] = [];
  private isLoggingEnabled: boolean = false;

  constructor() {
    // Load existing logs from localStorage
    const storedLogs = localStorage.getItem(LogKey);
    if (storedLogs) {
      this.logs = JSON.parse(storedLogs);
    }
    const loggingEnabled = localStorage.getItem(LogEnabledKey);
    this.isLoggingEnabled = loggingEnabled === "true";
  }

  addLog(message: string): void {
    if (this.isLoggingEnabled) {
      this.logs.push(message + "\n");
      // Sync with localStorage
      localStorage.setItem(LogKey, JSON.stringify(this.logs));
    }
    this.sessionLogs.push(message + "\n");
    console.log(message);
  }

  getLogs(): string[] {
    return this.logs;
  }

  getSessionLogs(): string[] {
    return this.sessionLogs;
  }

  enableLogging(): void {
    this.isLoggingEnabled = true;
    localStorage.setItem(LogEnabledKey, "true");
  }

  disableLogging(): void {
    this.isLoggingEnabled = false;
    localStorage.setItem(LogEnabledKey, "false");
  }

  isEnabled(): boolean {
    return this.isLoggingEnabled;
  }
}

let loggerInstance: Logger | null = null;

export function getLogger(): Logger {
  if (!loggerInstance) {
    loggerInstance = new Logger();
  }
  return loggerInstance;
}
