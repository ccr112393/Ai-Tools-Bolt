import { TextArea } from "@adobe/react-spectrum";
import { ModuleType } from "./moduleType";

function DevModule() {
  return (
    <>
      <TextArea isDisabled />
    </>
  );
}

export default DevModule;

export const DeveloperModule: ModuleType = {
  key: "dev",
  name: "Developer",
  component: DevModule,
};
