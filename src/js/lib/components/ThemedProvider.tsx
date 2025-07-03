import { Provider, View } from "@adobe/react-spectrum";
import React from "react";
import { useTheme } from "../contexts";

export const ThemedProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const themeSettings = useTheme();

  return (
    <Provider
      theme={themeSettings.theme}
      colorScheme={themeSettings.colorScheme}
      scale="medium"
      margin={0}
    >
      <style>{`
        html, body, #root{
          margin: 0;
          padding: 0;
          height: 100%;
          overflow: auto;
          background-color:  ${themeSettings.backgroundColor};
        }

      `}</style>
      <View
        padding={"calc(single-line-height / 2"}
        paddingTop={"calc(single-line-height / 2.5"}
      >
        {children}
      </View>
    </Provider>
  );
};
