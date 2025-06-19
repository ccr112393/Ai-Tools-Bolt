import { darkTheme, Flex, Provider, View } from "@adobe/react-spectrum";
import { ToastContainer } from "@react-spectrum/toast";
import { ModuleTabs, ThemedProvider } from "../lib/components";

const Main = () => {
  return (
    <Provider theme={darkTheme} colorScheme="dark" scale="medium">
      <View>
        <Flex
          direction={"column"}
          maxWidth={"static-size-6000"}
          margin={"auto"}
        >
          <ModuleTabs />
          <ToastContainer />
        </Flex>
      </View>
    </Provider>
  );
};

export default Main;
