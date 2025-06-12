import { createContext, useContext, useMemo, useState } from "react";
import {
  defaultProfileListEntry,
  newProfileSettings,
  ProfileKey,
  ProfileListType,
  ProfileSettings,
} from "..";
import {
  deleteLocalStorage,
  getLocalStorageProfiles,
  postToast,
  readLocalStorage,
  writeLocalStorage,
} from "../../../utils";
import { formatFieldName } from "../hooks";

interface ProfileContextType {
  // States
  activeProfile: ProfileSettings;
  setActiveProfile: React.Dispatch<React.SetStateAction<ProfileSettings>>;
  profileList: ProfileListType[];
  setProfileList: React.Dispatch<React.SetStateAction<ProfileListType[]>>;
  invalidSettings: string[];

  // Functions
  saveActiveProfile: (showSuccess?: boolean) => void;
  writeProfile: (settings: ProfileSettings, showSuccess?: boolean) => void;
  loadProfiles: (showSuccess?: boolean) => void;
  addProfile: (newProfile: string, showSuccess?: boolean) => void;
  removeProfile: (id: string, showSuccess?: boolean) => void;

  // Return Functions
  getProfileListNoDefault: () => ProfileListType[];
  sortProfileList: (listToSort: ProfileListType[]) => ProfileListType[];
  readProfile: (profileID: string, showSuccess?: boolean) => ProfileSettings;
  validateProfile: (newProfile: string) => boolean;
}

const ProfileContext = createContext<ProfileContextType | undefined>(undefined);

export function ProfileProvider({ children }: { children: React.ReactNode }) {
  const [profileList, setProfileList] = useState([defaultProfileListEntry]);

  const [activeProfile, setActiveProfile] = useState<ProfileSettings>(
    newProfileSettings()
  );

  const getProfileListNoDefault = (): ProfileListType[] => {
    return profileList.filter((item) => item.id !== "default");
  };

  const sortProfileList = (listToSort: ProfileListType[]) => {
    let defaultProfile = listToSort.find((profile) => profile.id === "default");
    let sortedList = listToSort
      .filter((profile) => profile.id !== "default")
      .sort((a, b) => a.id.localeCompare(b.id));

    if (defaultProfile) {
      sortedList.unshift(defaultProfile);
    }
    return sortedList;
  };

  const writeProfile = (profileToSave: ProfileSettings) => {
    const fileName = ProfileKey + profileToSave.id;
    writeLocalStorage(fileName, profileToSave);
  };

  const saveActiveProfile = (showSuccess = false) => {
    writeProfile(activeProfile);
    showSuccess ? postToast("positive", "Profile saved successfully") : null;
  };

  const readProfile = (profileID: string): ProfileSettings => {
    // Ensure File Name has ProfileKey
    const trimmedID = profileID.trim();
    const fileName = trimmedID.startsWith(ProfileKey)
      ? trimmedID
      : `${ProfileKey}${trimmedID}`;

    // Read Profile Settings from Local Storage
    const storedSettings = readLocalStorage(fileName);
    if (storedSettings) {
      return storedSettings;
    } else {
      return newProfileSettings();
    }
  };

  const loadProfiles = (showSuccess = false) => {
    try {
      // Get all profiles from local storage
      const storedProfiles = getLocalStorageProfiles();

      if (storedProfiles && storedProfiles.length > 0) {
        let formattedProfileList = storedProfiles.map((profile) => {
          const profileInfo = readProfile(profile);
          return { id: profileInfo.id, name: profileInfo.name };
        });

        if (!formattedProfileList.includes(defaultProfileListEntry)) {
          formattedProfileList.push(defaultProfileListEntry);
          console.log("Default not found in stored settings, added Default");
        }

        formattedProfileList = sortProfileList(formattedProfileList);

        if (profileList != formattedProfileList) {
          setProfileList(formattedProfileList);
        }

        if (
          !profileList.includes({
            id: activeProfile.id,
            name: activeProfile.name,
          })
        ) {
          console.log(
            `Active Profile (${activeProfile.id}) not found in profile list`
          );
          setActiveProfile(readProfile("default"));
        }
      }

      showSuccess
        ? postToast("positive", "Profiles loaded successfully")
        : null;
    } catch (error) {
      error instanceof Error
        ? postToast("negative", error.message)
        : postToast("negative", "Something went wrong trying to load");
    }
  };

  const validateProfile = (newProfile: string): boolean => {
    let valid = true;
    let message = "";

    // Check if profile name is valid or already exists
    if (newProfile === "") {
      message = "Profile name cannot be empty";
      valid = false;
    }
    if (
      profileList.find(
        (item) =>
          item.name === newProfile || item.id === formatFieldName(newProfile)
      )
    ) {
      message = "Profile name already exists";
      valid = false;
    }
    if (!valid) {
      postToast("negative", message);
    }
    return valid;
  };

  const addProfile = (newProfileName: string, showSuccess = false) => {
    // Check if profile name is valid or already exists
    if (newProfileName !== "" && validateProfile(newProfileName)) {
      // Format Profile Name for ID
      const newProfileID = formatFieldName(newProfileName);
      const currentSettings = activeProfile;
      const newProfile: ProfileSettings = {
        ...currentSettings,
        id: newProfileID,
        name: newProfileName,
      };

      try {
        // Update Profile List (State)

        setProfileList((prevState) => {
          const updatedList = [
            ...prevState,
            { id: newProfileID, name: newProfileName },
          ];
          return sortProfileList(updatedList);
        });

        // Write Profile to Local Storage
        writeProfile(newProfile);

        showSuccess
          ? postToast("positive", `Added profile: ${newProfile}`)
          : null;
      } catch (error) {
        error instanceof Error
          ? postToast("negative", error.message)
          : postToast("negative", "Something went wrong trying to add profile");
      }
    }
  };

  const removeProfile = (id: string, showSuccess = false) => {
    try {
      let fileName = ProfileKey + id;

      // If removing active profile, set active profile to default
      if (activeProfile.id == id) {
        setActiveProfile(readProfile("default"));
      }

      setProfileList((prevState) => prevState.filter((item) => item.id !== id));
      deleteLocalStorage(fileName);

      showSuccess ? postToast("positive", `Removed profile: ${id}`) : null;
    } catch (error) {
      error instanceof Error
        ? postToast("negative", error.message)
        : postToast(
            "negative",
            "Something went wrong trying to remove profile"
          );
    }
  };

  const validateSettings = (): string[] => {
    const ap = activeProfile;
    let invalidSelections: string[] = [];

    if (ap.color.hasColor && ap.color.color == "") {
      invalidSelections.push("color");
    }

    if (ap.color.hasFillColor && ap.color.fillColor == "") {
      invalidSelections.push("fillColor");
    }

    if (ap.color.hasStrokeColor && ap.color.strokeColor == "") {
      invalidSelections.push("strokeColor");
    }

    if (ap.textOptions.hasLeading && Number.isNaN(ap.textOptions.leading)) {
      invalidSelections.push("leading");
    }

    invalidSelections.length > 0 &&
      console.log("Invalid Selections:", invalidSelections);
    return invalidSelections;
  };

  const invalidSettings = useMemo(() => validateSettings(), [activeProfile]);

  const value = useMemo(
    () => ({
      saveActiveProfile,
      activeProfile,
      setActiveProfile,
      profileList,
      setProfileList,
      writeProfile,
      readProfile,
      loadProfiles,
      addProfile,
      removeProfile,
      validateProfile,
      newProfileSettings,
      getProfileListNoDefault,
      sortProfileList,
      invalidSettings,
    }),
    [activeProfile, profileList, invalidSettings]
  );
  return (
    <ProfileContext.Provider value={value}>{children}</ProfileContext.Provider>
  );
}

export function useProfile() {
  const context = useContext(ProfileContext);
  if (context === undefined) {
    throw new Error("useProfile must be used within a ProfileProvider");
  }
  return context;
}
