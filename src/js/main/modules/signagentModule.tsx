import { ModuleType } from "./moduleInterface";
import { SignAgentComponent } from "./signagentComponent";

export default SignAgentComponent;

export const SignAgentModule: ModuleType = {
  key: "sat",
  name: "SignAgent™️ Tools",
  component: SignAgentComponent,
};
