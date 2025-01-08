import { Provider, View, darkTheme, lightTheme } from "@adobe/react-spectrum";
import React, { useEffect, useState } from "react";
import { subscribeBackgroundColor } from "../utils/bolt";

type ColorScheme = "dark" | "light";

interface ThemeSetting {
  theme: typeof darkTheme;
  colorScheme: ColorScheme;
  backgroundColor: string;
}

const backgroundColorHexCode = {
  darkDark: "#1d1d1d",
  darkLight: "#323232",
  lightLight: "#fdfdfd",
};

export const ThemedProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const [themeSettings, setThemeSettings] = useState<ThemeSetting>({
    theme: darkTheme,
    colorScheme: "dark",
    backgroundColor: backgroundColorHexCode.darkDark,
  });

  useEffect(() => {
    let newThemeSettings: ThemeSetting;
    try {
      subscribeBackgroundColor((color) => {
        const [r, g, b] = color.match(/\d+/g)?.map(Number) || [0, 0, 0];
        switch (true) {
          case r === 50 && g === 50 && b === 50:
            // Dark Dark
            newThemeSettings = {
              theme: darkTheme,
              colorScheme: "dark",
              backgroundColor: backgroundColorHexCode.darkDark,
            };
            break;
          case r === 83 && g === 83 && b === 83:
            // Dark Light
            newThemeSettings = {
              theme: darkTheme,
              colorScheme: "light",
              backgroundColor: backgroundColorHexCode.darkLight,
            };
            break;
          case r === 184 && g === 184 && b === 184:
          case r === 240 && g === 240 && b === 240:
            // Light Light
            newThemeSettings = {
              theme: lightTheme,
              colorScheme: "light",
              backgroundColor: backgroundColorHexCode.lightLight,
            };
            break;
          default:
            // Dark Dark
            newThemeSettings = {
              theme: darkTheme,
              colorScheme: "dark",
              backgroundColor: backgroundColorHexCode.darkDark,
            };
        }

        if (themeSettings != newThemeSettings) {
          setThemeSettings(newThemeSettings);
        }
      });
    } catch (error) {
      let msg =
        "Could not subscribe to background color. Are you sure you're running this in Illustrator";
      error instanceof Error ? console.log(error.message) : console.log(msg);
    }
  }, []);

  return (
    <Provider
      theme={themeSettings.theme}
      colorScheme={themeSettings.colorScheme}
      scale="medium"
      height="100vh"
      width="100vw"
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
