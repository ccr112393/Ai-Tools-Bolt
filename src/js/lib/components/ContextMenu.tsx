import { Item, Menu } from "@adobe/react-spectrum";
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
