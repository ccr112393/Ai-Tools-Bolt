import { Flex } from "@adobe/react-spectrum";
import { ToastContainer } from "@react-spectrum/toast";
import { ThemedProvider } from "../lib/components";
import { ModuleTabs } from "../lib/modules";
import { AiThemeProvider } from "../lib/contexts/ThemeContext";

const Main = () => {
  return (
    <AiThemeProvider>
      <ThemedProvider>
        <Flex
          direction={"column"}
          maxWidth={"static-size-5000"}
          margin={"auto"}
        >
          <ModuleTabs />
          <ToastContainer />
        </Flex>
      </ThemedProvider>
    </AiThemeProvider>
  );
};

export default Main;
