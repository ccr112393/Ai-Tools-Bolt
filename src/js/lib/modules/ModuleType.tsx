import { AboutModule } from "./About";
import { RegistrationModule } from "./Registration";
import { RenameModule } from "./Rename";
import { SignAgentModule } from "./SignAgent";

export interface ModuleType {
  key: string;
  name: string;
  component: React.FC;
  icon?: JSX.Element;
}

export const EnabledModules: ModuleType[] = [
  RegistrationModule,
  RenameModule,
  SignAgentModule,
  AboutModule,
];
