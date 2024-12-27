import { Provider, darkTheme, lightTheme } from "@adobe/react-spectrum";
import React, { useEffect, useState } from "react";
import { subscribeBackgroundColor } from "../../lib/utils/bolt";
import { getLogger } from "../modules";

export const ThemedProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const logger = getLogger();
  const [appBackgroundColor, setAppBackgroundColor] = useState("#323232");
  const [appTheme, setAppTheme] = useState(darkTheme);
  const [colorScheme, setColorScheme] = useState<"dark" | "light">("dark");

  useEffect(() => {
    try {
      subscribeBackgroundColor((color) => {
        const [r, g, b] = color.match(/\d+/g)?.map(Number) || [0, 0, 0];
        logger.addLog("Subscribed Background Color: " + [r, g, b].toString());
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
    } catch (error) {
      let msg =
        "Could not subscribe to background color. Are you sure you're running this in Illustrator";
      error instanceof Error
        ? logger.addLog(error.message)
        : logger.addLog(msg)
    }
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
