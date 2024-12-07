import React from "react";
import ReactDOM from "react-dom/client";
import { csi, evalES, initBolt } from "../lib/utils/bolt";
import { enableSpectrum } from "../lib/utils/bolt";

import Main from "./main";

enableSpectrum();
initBolt();

document.addEventListener("contextmenu", (e) => {
  e.preventDefault();
  return false;
});

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <Main />
  </React.StrictMode>
);
