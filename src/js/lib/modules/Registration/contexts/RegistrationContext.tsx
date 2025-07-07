import { useState, useEffect, useContext, createContext, useMemo } from "react";
import { writeLocalStorage, readLocalStorage, postToast } from "../../../utils";
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
  invalidSettings: string[];
}

const RegistrationContext = createContext<RegistrationContextType | undefined>(
  undefined
);

export function RegistrationProvider({
  children,
}: {
  children: React.ReactNode;
}) {
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
      error instanceof Error ? console.log(error.message) : console.log(error);
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
      error instanceof Error ? console.log(error.message) : console.log(error);
    }
  };

  const updateSettings = (key: string, value: any) => {
    setRegistrationSettings((prevSettings) => ({
      ...prevSettings,
      [key]: value,
    }));
  };

  const validateSettings = (): string[] => {
    const reg = registrationSettings;
    let invalidSelections: string[] = [];

    if (reg.layerName == "" || undefined) {
      invalidSelections.push("layerName");
    }

    if (Number.isNaN(reg.diameter) || reg.diameter <= 0) {
      invalidSelections.push("diameter");
    }

    if (
      (Number.isNaN(reg.marksDistanceValue) || reg.marksDistanceValue <= 0) &&
      registrationSettings.marksDistance
    ) {
      invalidSelections.push("marksDistanceValue");
    }

    console.log(invalidSelections, invalidSelections.length);
    return invalidSelections;
  };

  const invalidSettings = useMemo(
    () => validateSettings(),
    [registrationSettings]
  );

  useEffect(() => {
    loadSettings();
  }, []);

  const value = {
    registrationSettings,
    setRegistrationSettings,
    saveSettings,
    loadSettings,
    updateSettings,
    invalidSettings,
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
