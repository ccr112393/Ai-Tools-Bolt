import { Badge } from "@adobe/react-spectrum";
import { DeveloperMenu } from "./DeveloperMenu";

export const EnableDeveloperMode = true;

export const DeveloperBadge = () => {
    // return <Badge variant="yellow">DEV</Badge>
    return <DeveloperMenu />
};