import { TextArea } from "@adobe/react-spectrum";
import { MainModule } from "./main-module";

function DevModule() {
  return (
    <>
      <TextArea isDisabled />
    </>
  );
}

export default DevModule;

export const DeveloperModule: MainModule = {
  key: "dev",
  name: "Developer",
  component: DevModule,
};
