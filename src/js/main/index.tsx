import ReactDOM from "react-dom/client";
import { enableSpectrum, initBolt } from "../lib/utils/bolt";
import Main from "./main";

const platformOS = navigator.platform.toLowerCase();
console.log("Operating System: ", platformOS);

if (platformOS.includes("mac")) {
  enableSpectrum();
  console.log("enableSpectrum");
}

initBolt();
console.log("initBolt");

document.addEventListener("contextmenu", (e) => {
  e.preventDefault();
  return false;
});

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  // <React.StrictMode>
  <>
    <Main />
    <button onClick={() => alert("Testing111")}>Testing</button>
  </>
  // </React.StrictMode>
);
