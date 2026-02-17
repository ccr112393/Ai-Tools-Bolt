import { CEP_Config } from "vite-cep-plugin";
import { version } from "./package.json";

const VARIANT = "template";

const configs = {
  printer: {
    id: "com.crob.printertools",
    displayName: "PrinterTools",
    icons: {
      light: "./assets/light-icon.png",
      dark: "./assets/dark-icon.png",
    },
  },
  template: {
    id: "com.crob.templatetools",
    displayName: "TemplateTools",
    icons: {
      light: "./assets/light-icon.png",
      dark: "./assets/dark-icon.png",
    },
  },
};

console.log(`\nCONFIG VARIANT: ${VARIANT}\n`);

const activeConfig = configs[VARIANT];

const config: CEP_Config = {
  version,
  id: activeConfig.id,
  displayName: activeConfig.displayName,
  symlink: "local",
  port: 3000,
  servePort: 5000,
  startingDebugPort: 8860,
  extensionManifestVersion: 6.0,
  requiredRuntimeVersion: 9.0,
  hosts: [{ name: "ILST", version: "23.0" }],
  type: "Panel",
  iconDarkNormal: activeConfig.icons.light,
  iconNormal: activeConfig.icons.dark,
  iconDarkNormalRollOver: activeConfig.icons.light,
  iconNormalRollOver: activeConfig.icons.dark,
  parameters: ["--v=0", "--enable-nodejs", "--mixed-context"],
  width: 375,
  height: 650,
  minWidth: 300,
  minHeight: 400,
  maxWidth: 800,
  maxHeight: 1000,

  panels: [
    {
      mainPath: "./main/index.html",
      name: "main",
      panelDisplayName: "Ai Tools",
      autoVisible: true,
    },
  ],
  build: {
    jsxBin: "off",
    sourceMap: true,
  },
  zxp: {
    country: "US",
    province: "NC",
    org: "crdev",
    password: "ColorCharlotte2020",
    tsa: [
      "http://timestamp.digicert.com/", // Windows Only
      "http://timestamp.apple.com/ts01", // MacOS Only
    ],
    allowSkipTSA: false,
    sourceMap: false,
    jsxBin: "off",
  },
  installModules: [],
  copyAssets: ["assets"],
  copyZipAssets: [],
};
export default config;
