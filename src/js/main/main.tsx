import { Flex } from "@adobe/react-spectrum";
import { ToastContainer } from "@react-spectrum/toast";
import { ModuleTabs, ThemedProvider } from "../lib/components";
import { useAtomValue } from "jotai";
import { atomWithStorage } from "jotai/utils";
import { useEffect } from "react";

// export const appUIScaleAtom = atomWithStorage("appUIScale", "90%");

const Main = () => {
  // const appUIScaleValue = useAtomValue(appUIScaleAtom);

  // useEffect(() => {
  //   document.body.style.zoom = appUIScaleValue;
  //   console.log("UI Scale: ", appUIScaleValue);
  // }, []);

  return (
    <ThemedProvider>
      <Flex
        direction={"column"}
        maxWidth={"static-size-5000"}
        margin={"auto"}
        // UNSAFE_style={{
        //   transform: `scale(${appUIScaleValue})`,
        //   transformOrigin: "top center",
        // }}
      >
        {/* <style>{`
        [class*="spectrum-Modal"] {
          transform: scale(${appUIScaleValue}) !important;
          transform-origin: top center !important;
        }
          [class*="spectrum-Popover"] {
          transform: scale(${appUIScaleValue}) !important;
          transform-origin: top left !important;
        }
        `}</style> */}
        <ModuleTabs />
        <ToastContainer />
      </Flex>
    </ThemedProvider>
  );
};

export default Main;
