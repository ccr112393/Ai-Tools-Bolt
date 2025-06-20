import React, { createContext, useContext, useState, Key } from "react";

type TabContextType = {
  selectedTab: string;
  setSelectedTab: (key: string) => void;
};

export const TabContext = createContext<TabContextType | undefined>(undefined);

export const useTabContext = () => {
  const context = useContext(TabContext);
  if (!context) {
    throw new Error("useTabContext must be used within a TabContextProvider");
  }
  return context;
};
