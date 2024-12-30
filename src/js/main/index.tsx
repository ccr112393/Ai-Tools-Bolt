import { Item, Menu } from "@adobe/react-spectrum";
import React, { useRef, useState } from "react";
import ReactDOM from "react-dom/client";
import { enableSpectrum, initBolt } from "../lib/utils/bolt";
import Main from "./main";

initBolt();

const platformOS = navigator.platform.toLowerCase();
console.log("Operating System: ", platformOS);

if (platformOS.includes("mac")) {
  enableSpectrum();
}

function ContextMenu() {
  const menuRef = useRef(null);

  const [isOpen, setIsOpen] = useState(false);
  const [menuPosition, setMenuPosition] = useState({ x: 0, y: 0 });

  function handleContextMenu(e: MouseEvent) {
    e.preventDefault();
    setMenuPosition({ x: e.clientX, y: e.clientY });
    setIsOpen(true);
  }

  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <Menu
      isHidden={!isOpen}
      ref={menuRef}
      onClose={handleClose}
      position={"fixed"}
      left={menuPosition.x}
      top={menuPosition.y}
    >
      <Item>Option 1</Item>
      <Item>Option 2</Item>
    </Menu>
  );
}

// document.addEventListener("contextmenu", (e) => {
//   e.preventDefault();
//   return false;
// });

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <Main />
  </React.StrictMode>
);
