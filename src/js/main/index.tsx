import React from "react";
import ReactDOM from "react-dom/client";
import { appInfo } from "../../../cep-variant.config";
import { enableSpectrum, initBolt } from "../lib/utils/bolt";
import Main from "./main";

initBolt();

const platformOS = navigator.platform.toLowerCase();
console.log("Operating System: ", platformOS);

if (platformOS.includes("mac")) {
  enableSpectrum();
}

document.title = appInfo.displayName;

document.addEventListener("contextmenu", (e) => {
  e.preventDefault();
  return false;
});

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <Main />
  </React.StrictMode>
);
