import { ToastQueue } from "@react-spectrum/toast";
import { createContext, ReactNode, useContext, useState } from "react";

interface LogContextType {
  internalLog: string;
  appLog: (message: string | string[], header?: string) => void;
  postToast: (
    style: "positive" | "negative" | "info" | "neutral",
    message: string
  ) => void;
}

const LogContext = createContext<LogContextType | undefined>(undefined);

export function LogProvider({ children }: { children: ReactNode }) {
  const [internalLog, setInternalLog] = useState("");
  const toastTimeout: number = 1500;
  const toastTimeoutExtended: number = 2500;

  function appLog(message: string | string[], header?: string) {
    let msg = Array.isArray(message) ? message.join(" ") : message;
    if (header) {
      console.log(header + ": " + msg);
      setInternalLog((prevLog) => header + ": " + msg + "\n" + prevLog);
    } else {
      console.log(msg);
      setInternalLog((prevLog) => msg + "\n" + prevLog);
    }
  }

  function postToast(
    style: "positive" | "negative" | "info" | "neutral",
    message: string
  ) {
    appLog(message, style.toUpperCase());

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

  return (
    <LogContext.Provider value={{ internalLog, appLog, postToast }}>
      {children}
    </LogContext.Provider>
  );
}

export function useLog() {
  const context = useContext(LogContext);
  if (context === undefined) {
    throw new Error("useLog must be used within a LogProvider");
  }
  return context;
}
