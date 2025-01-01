import { Content, Flex, View } from "@adobe/react-spectrum";
import { ToastContainer } from "@react-spectrum/toast";
import { ModuleTabs, ThemedProvider } from "../lib/components";
import { getLogger } from "../lib/modules";

const Main = () => {
  const logger = getLogger();
  console.log("Hello from Main");
  return (
    <ThemedProvider>
      <View
        padding={"calc(single-line-height / 2"}
        paddingTop={"calc(single-line-height / 2.5"}
      >
        <Flex
          direction={"column"}
          maxWidth={"static-size-5000"}
          margin={"auto"}
        >
          <ModuleTabs />
          <ToastContainer />
        </Flex>
      </View>
    </ThemedProvider>
  );
};
export default Main;
