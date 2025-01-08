import { Flex } from "@adobe/react-spectrum";
import { ToastContainer } from "@react-spectrum/toast";
import { ModuleTabs, ThemedProvider } from "../lib/components";

const Main = () => {
  console.log("Hello from Main");
  return (
    <ThemedProvider>
      <Flex
        direction={"column"}
        maxWidth={"static-size-5000"}
        margin={"auto"}
        UNSAFE_style={{
          transform: "scale(0.9)",
          transformOrigin: "top center",
        }}
      >
        <ModuleTabs />
        <ToastContainer />
      </Flex>
    </ThemedProvider>
  );
};
export default Main;
