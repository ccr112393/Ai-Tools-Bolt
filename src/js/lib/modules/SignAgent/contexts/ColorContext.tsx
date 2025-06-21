import React, { createContext, useContext, useState, ReactNode } from "react";

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
  setColorList: React.Dispatch<React.SetStateAction<SignAgentColor[]>>;
}

const ColorContext = createContext<ColorContextType | undefined>(undefined);

export const ColorProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [colorList, setColorList] = useState<SignAgentColor[]>([]);

  return (
    <ColorContext.Provider value={{ colorList, setColorList }}>
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
