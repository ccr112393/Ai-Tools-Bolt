import { darkTheme, lightTheme } from "@adobe/react-spectrum";
import React, { createContext, useContext, useEffect, useState } from "react";
import { subscribeBackgroundColor } from "../utils";

export type ColorScheme = "dark" | "light";

interface ThemeSetting {
  theme: typeof darkTheme;
  colorScheme: ColorScheme;
  backgroundColor: string;
}

export const backgroundColorHexCode = {
  darkDark: "#1d1d1d",
  darkLight: "#323232",
  lightDark: "#B9B9B9",
  lightLight: "#fdfdfd",
};

// Naming Scheme combines the Theme and the Color Scheme
// Example: themeLightDark = Light Theme & Dark Color Scheme

export const themeDarkDark: ThemeSetting = {
  theme: darkTheme,
  colorScheme: "dark",
  backgroundColor: backgroundColorHexCode.darkDark,
};

export const themeDarkLight: ThemeSetting = {
  theme: darkTheme,
  colorScheme: "light",
  backgroundColor: backgroundColorHexCode.darkLight,
};

export const themeLightDark: ThemeSetting = {
  theme: lightTheme,
  colorScheme: "light",
  backgroundColor: backgroundColorHexCode.lightLight,
};

export const themeLightLight: ThemeSetting = {
  theme: lightTheme,
  colorScheme: "light",
  backgroundColor: backgroundColorHexCode.lightLight,
};

export const themeDefault: ThemeSetting = themeDarkDark;

export const ThemeContext = createContext<ThemeSetting | undefined>(undefined);

export function AiThemeProvider({ children }: { children: React.ReactNode }) {
  const [themeSettings, setThemeSettings] =
    useState<ThemeSetting>(themeDefault);

  function themeSettingsEqual(a: ThemeSetting, b: ThemeSetting) {
    return (
      a.theme === b.theme &&
      a.colorScheme === b.colorScheme &&
      a.backgroundColor === b.backgroundColor
    );
  }

  useEffect(() => {
    let newThemeSettings: ThemeSetting;
    try {
      subscribeBackgroundColor((color) => {
        const [r, g, b] = color.match(/\d+/g)?.map(Number) || [0, 0, 0];
        switch (true) {
          case r === 50 && g === 50 && b === 50:
            // Dark Dark
            newThemeSettings = themeDarkDark;
            // newThemeSettings = {
            //   theme: darkTheme,
            //   colorScheme: "dark",
            //   backgroundColor: backgroundColorHexCode.darkDark,
            // };
            break;
          case r === 83 && g === 83 && b === 83:
            // Dark Light
            newThemeSettings = themeDarkLight;
            // newThemeSettings = {
            //   theme: darkTheme,
            //   colorScheme: "light",
            //   backgroundColor: backgroundColorHexCode.darkLight,
            // };
            break;
          case r === 184 && g === 184 && b === 184:
            // Light Dark
            newThemeSettings = themeLightDark;
            break;
          case r === 240 && g === 240 && b === 240:
            // Light Light
            newThemeSettings = themeLightLight;
            // newThemeSettings = {
            //   theme: lightTheme,
            //   colorScheme: "light",
            //   backgroundColor: backgroundColorHexCode.lightLight,
            // };
            break;
          default:
            newThemeSettings = themeDefault;
        }

        // if (!themeSettingsEqual(themeSettings, newThemeSettings)) {
        //   setThemeSettings(newThemeSettings);
        // }

        setThemeSettings((prev) => {
          if (!themeSettingsEqual(prev, newThemeSettings)) {
            return newThemeSettings;
          }
          return prev;
        });
      });
    } catch (error) {
      let msg = "Unable to subscribe to host background color.";
      if (error instanceof Error) {
        console.log(
          error.message.search("undefined") > -1 ? msg : error.message
        );
      }
    }
  }, []);

  const value = themeSettings;
  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context)
    throw new Error("useTheme must be used within a AiThemeProvider");
  return context;
}
