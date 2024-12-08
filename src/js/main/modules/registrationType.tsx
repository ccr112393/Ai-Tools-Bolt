import { ModuleType } from "./index";
import { Registration } from "./registration";

export interface RegistrationSettings {
  unit: string;
  layerName: string;
  diameter: number;
  edgeOffset: number;
  marksPrimary: boolean;
  marksOrientation: boolean;
  marksOrientationLocation: string;
  marksCenter: boolean;
  marksDistance: boolean;
  marksDistanceValue: number;
  colorMode: string;
}

export default Registration;

export const RegistrationModule: ModuleType = {
  key: "reg",
  name: "Registration",
  component: Registration,
};
