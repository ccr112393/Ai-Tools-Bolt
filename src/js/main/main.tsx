import { Flex, Heading } from "@adobe/react-spectrum";
import { ToastContainer } from "@react-spectrum/toast";
import { ThemedProvider } from "../lib/components";
import { ModuleTabs } from "../lib/modules";

const Main = () => {
  return (
    <ThemedProvider>
      <Flex direction={"column"} maxWidth={"static-size-5000"} margin={"auto"}>
        <ModuleTabs />
        <ToastContainer />
      </Flex>
    </ThemedProvider>
  );
};

export default Main;
