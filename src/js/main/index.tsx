import React from "react";
import ReactDOM from "react-dom/client";
import { initBolt } from "../lib/utils/bolt";
// import { enableSpectrum } from "../lib/utils/bolt";
import "./styles/topcoat-desktop-dark.css";

import Main from "./main";

// enableSpectrum();
initBolt();

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <style>{`
        html, body, #root{
          margin: 0;
          padding: 0;
          height: 100%;
          overflow: hidden;
        }
      `}</style>
    <Main />
  </React.StrictMode>
);
