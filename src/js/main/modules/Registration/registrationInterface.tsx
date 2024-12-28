import { Icon } from "@adobe/react-spectrum";

import { ModuleType, RegistrationComponent } from "../";

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

export const RegistrationSettingsKey = "registrationSettings";

export const RegistrationIcon = (
  <Icon>
    <svg width=".25in" height=".25in" viewBox="0 0 18 18">
      <circle cx="1.5" cy="1.5" r="1" />
      <circle cx="1.5" cy="6.0" r="1" />
      <circle cx="6.0" cy="1.5" r="1" />
      <circle cx="1.5" cy="13.5" r="1" />
      <circle cx="13.5" cy="1.5" r="1" />
      <circle cx="13.5" cy="13.5" r="1" />
    </svg>
  </Icon>
);

export default RegistrationComponent;

export const RegistrationModule: ModuleType = {
  key: "reg",
  name: "Registration",
  component: RegistrationComponent,
  icon: RegistrationIcon,
};
