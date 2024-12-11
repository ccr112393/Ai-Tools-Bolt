import React from "react";
import ReactDOM from "react-dom/client";
import { enableSpectrum, initBolt } from "../lib/utils/bolt";

import Main from "./main";

initBolt();
enableSpectrum();

document.addEventListener("contextmenu", (e) => {
  e.preventDefault();
  return false;
});

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <Main />
  </React.StrictMode>
);
