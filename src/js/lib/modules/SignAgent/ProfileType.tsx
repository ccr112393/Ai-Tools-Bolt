export const ProfileKey = "SAT_profile_"; // SignAgentKey + ProfileKey

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

export const defaultProfileListEntry: ProfileListType = {
  id: "default",
  name: "Default",
};

export const newProfileSettings = (): ProfileSettings => {
  return {
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
};
