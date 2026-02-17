import { AboutModule } from "./About";
import { LaserModule } from "./Laser";
import { ModuleType } from "./ModuleType";
import { RegistrationModule } from "./Registration";
import { RenameModule } from "./Rename";
import { SignAgentModule } from "./SignAgent";


const PrinterModules: ModuleType[] = [RegistrationModule, LaserModule, RenameModule, AboutModule];

const TemplateModules: ModuleType[] = [SignAgentModule, AboutModule];

const AppMode = import.meta.env.VITE_APP_VARIANT ?? "printer";

const Modules: ModuleType[] = AppMode === "printer" ? PrinterModules : TemplateModules;

console.log(`
    \n\n
    App Mode: ${AppMode}
    Enabled Modules: ${Modules}
    \n\n`
);


export { Modules };