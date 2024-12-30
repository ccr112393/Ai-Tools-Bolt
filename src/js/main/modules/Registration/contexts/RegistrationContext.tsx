import { useState, useEffect, useContext, createContext } from "react";
import { writeLocalStorage, readLocalStorage, postToast } from "../../../utils";
import { getLogger } from "../../Developer";
import { RegistrationSettings, RegistrationKey } from "../RegistrationType";
import { isEqual } from "lodash";

interface RegistrationContextType {
  registrationSettings: RegistrationSettings;
  setRegistrationSettings: React.Dispatch<
    React.SetStateAction<RegistrationSettings>
  >;

  saveSettings: () => void;
  loadSettings: () => void;
  updateSettings: (key: string, value: any) => void;
}

const RegistrationContext = createContext<RegistrationContextType | undefined>(
  undefined
);

export function RegistrationProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const logger = getLogger();

  const [registrationSettings, setRegistrationSettings] =
    useState<RegistrationSettings>({
      unit: "inch",
      layerName: "Registration",
      diameter: 0.25,
      edgeOffset: 0.5,
      marksPrimary: true,
      marksOrientation: true,
      marksOrientationLocation: "top-left",
      marksCenter: false,
      marksDistance: false,
      marksDistanceValue: 24,
      colorMode: "cmyk",
    });

  const saveSettings = () => {
    try {
      if (writeLocalStorage(RegistrationKey, registrationSettings)) {
        postToast("positive", "Settings saved!");
      }
    } catch (error) {
      error instanceof Error
        ? logger.addLog(error.message)
        : console.log(error);
    }
  };

  const loadSettings = () => {
    try {
      const storedSettings = readLocalStorage(RegistrationKey);
      if (storedSettings) {
        if (!isEqual(storedSettings, registrationSettings)) {
          setRegistrationSettings(storedSettings);
        }
      }
    } catch (error) {
      error instanceof Error
        ? logger.addLog(error.message)
        : console.log(error);
    }
  };

  const updateSettings = (key: string, value: any) => {
    setRegistrationSettings((prevSettings) => ({
      ...prevSettings,
      [key]: value,
    }));
  };

  useEffect(() => {
    loadSettings();
  }, []);

  const value = {
    registrationSettings,
    setRegistrationSettings,
    saveSettings,
    loadSettings,
    updateSettings,
  };

  return (
    <RegistrationContext.Provider value={value}>
      {children}
    </RegistrationContext.Provider>
  );
}

export function useRegistration() {
  const context = useContext(RegistrationContext);
  if (context === undefined) {
    throw new Error(
      "useRegistration must be used within a RegistrationProvider"
    );
  }
  return context;
}
