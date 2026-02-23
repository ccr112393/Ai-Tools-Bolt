import { version } from "./package.json";

export type AppVariant = "printertools" | "templatetools";
export type VariantConfig = {
  version: string;
  id: string;
  displayName: string;
  icons: {
    light: string;
    dark: string;
  };
};

// !! Set the active variant here
export const appVariant: AppVariant = "templatetools";

// Define App Variants and Configirations here
export const variantConfigs: Record<AppVariant, VariantConfig> = {
  printertools: {
    version: version + ".0.1-P",
    id: "dev.ccrob.printertools",
    displayName: "PrinterTools",
    icons: {
      light: "./assets/light-icon.png",
      dark: "./assets/dark-icon.png",
    },
  },
  templatetools: {
    version: version + ".0.1-T",
    id: "dev.ccrob.templatetools",
    displayName: "TemplateTools",
    icons: {
      light: "./assets/light-icon.png",
      dark: "./assets/dark-icon.png",
    },
  },
};

export const appInfo = variantConfigs[appVariant];
