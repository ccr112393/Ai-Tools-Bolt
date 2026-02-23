import { CEP_Config } from "vite-cep-plugin";
import { appInfo } from "./cep-variant.config";

const activeConfig = appInfo;

const config: CEP_Config = {
  version: activeConfig.version,
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
      panelDisplayName: activeConfig.displayName,
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
