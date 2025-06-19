import { Flex, Heading } from "@adobe/react-spectrum";
import { ToastContainer } from "@react-spectrum/toast";
import { ModuleTabs, ThemedProvider } from "../lib/components";

const Main = () => {
  return (
    <ThemedProvider>
      <Flex direction={"column"} maxWidth={"static-size-5000"} margin={"auto"}>
        <Heading>Testing</Heading>
        <ModuleTabs />
        <ToastContainer />
      </Flex>
    </ThemedProvider>
  );
};

export default Main;
