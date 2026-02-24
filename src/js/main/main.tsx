import { ToastContainer } from "@react-spectrum/s2";
import { style } from "@react-spectrum/s2/style" with { type: "macro" };
import { ThemedProvider } from "../lib/components";
import { ModuleTabs } from "../lib/modules";
import { AiThemeProvider } from "../lib/contexts/ThemeContext";

const Main = () => {
  return (
    <AiThemeProvider>
      <ThemedProvider>
        <div
          className={style({
            display: "flex",
            flexDirection: "column",
            maxWidth: 400,
            margin: "[auto]"
          })}>
          <ModuleTabs />
          <ToastContainer />
        </div>
      </ThemedProvider>
    </AiThemeProvider>
  );
};

export default Main;
