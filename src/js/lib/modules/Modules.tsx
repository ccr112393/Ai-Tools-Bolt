import { AppVariant, appVariant } from "../../../../cep-variant.config";
import { AboutModule } from "./About";
import { LaserModule } from "./Laser";
import { ModuleType } from "./ModuleType";
import { RegistrationModule } from "./Registration";
import { RenameModule } from "./Rename";
import { SignAgentModule } from "./SignAgent";

const VariantModules: Record<AppVariant, ModuleType[]> = {
  printertools: [RegistrationModule, LaserModule, RenameModule, AboutModule],
  templatetools: [SignAgentModule, AboutModule],
  aitools: [
    AboutModule,
    RegistrationModule,
    RenameModule,
    LaserModule,
    SignAgentModule,
  ],
};

const Modules: ModuleType[] = VariantModules[appVariant];

localStorage.setItem(
  "enabledModules",
  JSON.stringify(Modules.map((module) => module)),
);

console.log(`
    \n\n
    App Variant: ${appVariant}
    Enabled Modules: ${Modules}
    \n\n`);

export { Modules };
