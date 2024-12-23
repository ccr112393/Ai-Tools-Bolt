import { createContext, useState, useContext, ReactNode } from "react";

interface LogContextType {
  internalLog: string;
  appLog: (message: string | string[], header?: string) => void;
}

const LogContext = createContext<LogContextType | undefined>(undefined);

export function LogProvider({ children }: { children: ReactNode }) {
  const [internalLog, setInternalLog] = useState("");

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

  return (
    <LogContext.Provider value={{ internalLog, appLog }}>
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
