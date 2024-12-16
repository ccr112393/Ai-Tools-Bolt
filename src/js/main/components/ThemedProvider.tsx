import React, { useEffect, useState } from "react";
import { Provider, darkTheme, lightTheme } from "@adobe/react-spectrum";
import { subscribeBackgroundColor } from "../../lib/utils/bolt";

export const ThemedProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const [appBackgroundColor, setAppBackgroundColor] = useState("");
  const [appTheme, setAppTheme] = useState(darkTheme);
  const [colorScheme, setColorScheme] = useState<"dark" | "light">("dark");

  useEffect(() => {
    subscribeBackgroundColor((color) => {
      const [r, g, b] = color.match(/\d+/g)?.map(Number) || [0, 0, 0];
      console.log(r, g, b);
      switch (true) {
        case r === 50 && g === 50 && b === 50:
          setAppTheme(darkTheme);
          setColorScheme("dark");
          setAppBackgroundColor("#1d1d1d");
          break;
        case r === 83 && g === 83 && b === 83:
          setAppTheme(darkTheme);
          setColorScheme("light");
          setAppBackgroundColor("#323232");
          break;
        case r === 184 && g === 184 && b === 184:
        case r === 240 && g === 240 && b === 240:
          setAppTheme(lightTheme);
          setColorScheme("light");
          setAppBackgroundColor("#fdfdfd");
          break;
        default:
          setAppTheme(darkTheme);
          setColorScheme("dark");
      }
    });
  }, []);

  return (
    <Provider theme={appTheme} colorScheme={colorScheme} scale="medium">
      <style>{`
        html, body, #root{
          margin: 0;
          padding: 0;
          height: 100%;
          overflow: auto;
          background-color:  ${appBackgroundColor};
        }
      `}</style>
      {children}
    </Provider>
  );
};
