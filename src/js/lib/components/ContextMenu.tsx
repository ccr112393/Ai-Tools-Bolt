import { MenuItem, Menu } from "@react-spectrum/s2";
import { style } from "@react-spectrum/s2/style" with { type: "macro" };
import { useRef, useState } from "react";

function ContextMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const [menuPosition, setMenuPosition] = useState({ x: 0, y: 0 });
  const menuRef = useRef(null);

  //   const openContextMenu = (event) => {
  //     event.preventDefault();
  //     setMenuPosition({ x: event.clientX, y: event.clientY });
  //     setIsOpen(true);
  //   };

  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <Menu
      ref={menuRef}
      onClose={handleClose}
      styles={style({
        position: "fixed"
      })}
    >
      <MenuItem>Option 1</MenuItem>
      <MenuItem>Option 2</MenuItem>
    </Menu>
  );
}
