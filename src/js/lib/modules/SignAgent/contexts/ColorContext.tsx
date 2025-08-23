import React, { createContext, useContext, useState, ReactNode } from "react";
import { postToast, readLocalStorage, writeLocalStorage } from "../../../utils";
import { formatFieldName } from "../hooks";

export const ColorStorageKey = "CLR";
export const ColorListStorageKey = "CLR_LIST";

export interface SignAgentColor {
  id: string;
  name: string;
}

export interface SignAgentColorList {
  colorList: SignAgentColor[];
}

export interface ColorDisclosureProps {
  colorList: SignAgentColor[];
  setColorList: React.Dispatch<React.SetStateAction<SignAgentColor[]>>;
}

interface ColorContextType {
  colorList: SignAgentColor[];
  addColor: (name: string) => void;
  removeColor: (id: string) => void;
  saveColorList: () => void;
  loadColorList: () => void;
  getColorList: () => SignAgentColor[];
  setColorList: React.Dispatch<React.SetStateAction<SignAgentColor[]>>;
}

const ColorContext = createContext<ColorContextType | undefined>(undefined);

export const ColorProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [colorList, setColorList] = useState<SignAgentColor[]>([]);

  const saveColorList = () => {
    const settings: SignAgentColorList = { colorList };
    writeLocalStorage(ColorListStorageKey, settings);
  };

  const loadColorList = () => {
    const storedSettings = readLocalStorage(ColorListStorageKey);
    if (storedSettings !== null) {
      const settings: SignAgentColorList = storedSettings;
      if (colorList != settings.colorList) {
        setColorList(settings.colorList);
      }
    } else {
      setColorList([
        { id: "sign_color", name: "Sign Color" },
        { id: "text_color", name: "Text Color" },
      ]);
    }
  };

  const addColor = (name: string) => {
    if (!name) {
      postToast("negative", "Field name cannot be empty");
      return;
    }
    const id = formatFieldName(name);
    const exists = colorList.some((color) => color.id === id);
    if (exists) {
      postToast("negative", `Field name "${name}" already exists`);
      return;
    }
    setColorList((prev) => [...prev, { id, name }]);
  };

  const removeColor = (id: string) => {
    setColorList((prev) => prev.filter((color) => color.id !== id));
  };

  const getColorList = () => colorList;

  return (
    <ColorContext.Provider
      value={{
        colorList,
        addColor,
        removeColor,
        saveColorList,
        loadColorList,
        getColorList,
        setColorList,
      }}
    >
      {children}
    </ColorContext.Provider>
  );
};

export const useColorContext = () => {
  const context = useContext(ColorContext);
  if (!context) {
    throw new Error("useColorContext must be used within a ColorProvider");
  }
  return context;
};
