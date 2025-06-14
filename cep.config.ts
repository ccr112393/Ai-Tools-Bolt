import { CEP_Config } from "vite-cep-plugin";
// import { version } from "./package.json";

const config: CEP_Config = {
  version: "3.0.0",
  id: "com.crob.aitools",
  displayName: "Ai Tools",
  symlink: "local",
  port: 3000,
  servePort: 5000,
  startingDebugPort: 8860,
  extensionManifestVersion: 6.0,
  requiredRuntimeVersion: 9.0,
  hosts: [{ name: "ILST", version: "[0.0,99.9]" }],
  type: "Panel",
  iconDarkNormal: "./assets/light-icon.png",
  iconNormal: "./assets/dark-icon.png",
  iconDarkNormalRollOver: "./assets/light-icon.png",
  iconNormalRollOver: "./assets/dark-icon.png",
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
