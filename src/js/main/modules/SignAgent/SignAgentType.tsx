import { Icon } from "@adobe/react-spectrum";

import { ProfileProvider } from ".";
import { ModuleType } from "..";
import { SignAgentComponent } from "./SignAgentComponent";

export const SignAgentIcon = (
  <Icon>
    <svg width=".2165in" height=".25in" viewBox="0 0 15.58794 18">
      <polygon points="10.68983 8.9997 15.58794 6.14818 4.93898 0 4.91855 5.66765 10.68983 8.9997" />
      <polygon points="4.91855 12.33235 4.93898 18 15.58794 11.85182 10.68983 9.0003 4.91855 12.33235" />
      <polygon points="4.91855 5.66766 0 2.85153 0 15.14789 4.91855 12.33176 4.91855 5.66766" />
    </svg>
  </Icon>
);

export const SignAgentKey = "SAT";
export const ProfileKey = SignAgentKey + "_profile_";

export interface ProfileListType {
  id: string;
  name: string;
}

export interface ProfileSettings {
  id: string;
  name: string;
  justification: {
    hasHorizontal: boolean;
    hasVertical: boolean;
    horizontal: string;
    vertical: string;
  };
  color: {
    hasColor: boolean;
    hasFillColor: boolean;
    hasStrokeColor: boolean;
    color: string;
    fillColor: string;
    strokeColor: string;
  };
  textOptions: {
    hasTextCase: boolean;
    textCase: string;
    hasLeading: boolean;
    leading: number;
    leadingUnit: string;
  };
}

export const emptyProfileSettings: ProfileSettings = {
  id: "default",
  name: "Default",
  justification: {
    hasHorizontal: false,
    hasVertical: false,
    horizontal: "left",
    vertical: "top",
  },
  color: {
    hasColor: false,
    hasFillColor: false,
    hasStrokeColor: false,
    color: "",
    fillColor: "",
    strokeColor: "",
  },
  textOptions: {
    hasTextCase: false,
    textCase: "uppercase",
    hasLeading: false,
    leading: 3,
    leadingUnit: "point",
  },
};

export default function SignAgentWrapper() {
  return (
    <ProfileProvider>
      <SignAgentComponent />
    </ProfileProvider>
  );
}

export const SignAgentModule: ModuleType = {
  key: SignAgentKey,
  name: "SignAgent™ Tools",
  component: SignAgentWrapper,
  icon: SignAgentIcon,
};
