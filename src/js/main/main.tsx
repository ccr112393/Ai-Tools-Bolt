import { Flex } from "@adobe/react-spectrum";
import { ToastContainer } from "@react-spectrum/toast";
import { ModuleTabs, ThemedProvider } from "../lib/components";

const Main = () => {
  return (
    <ThemedProvider>
      <Flex direction={"column"} maxWidth={"static-size-6000"} margin={"auto"}>
        <ModuleTabs />
        <ToastContainer />
      </Flex>
    </ThemedProvider>
  );
};

export default Main;
