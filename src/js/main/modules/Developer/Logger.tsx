// logger.ts
class Logger {
  private logs: string[] = [];

  constructor() {
    // Load existing logs from localStorage
    const storedLogs = localStorage.getItem("app_logs");
    if (storedLogs) {
      this.logs = JSON.parse(storedLogs);
    }
  }

  addLog(message: string): void {
    this.logs.push(message + "\n");
    // Sync with localStorage
    localStorage.setItem("app_logs", JSON.stringify(this.logs));
    console.log(message);
  }

  getLogs(): string[] {
    return this.logs;
  }
}

let loggerInstance: Logger | null = null;

export function getLogger(): Logger {
  if (!loggerInstance) {
    loggerInstance = new Logger();
  }
  return loggerInstance;
}
