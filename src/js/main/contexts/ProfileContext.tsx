import React, { createContext, useContext, useState, useEffect } from "react";
import { useLog } from "./LogContext";
import {
  readLocalStorage,
  writeLocalStorage,
  formatFieldName,
  postToast,
  deleteLocalStorage,
  getLocalStorageProfiles,
} from "../modules";

import { ProfileKey, ProfileSettings, emptyProfileSettings } from "../modules";

interface ProfileContextType {
  activeProfileID: string;
  setActiveProfileID: React.Dispatch<React.SetStateAction<string>>;
  activeProfile: ProfileSettings;
  setActiveProfile: React.Dispatch<React.SetStateAction<ProfileSettings>>;
  profileList: { id: string; name: string }[];
  writeProfile: (settings: ProfileSettings, hideSuccess?: boolean) => void;
  readProfile: (profileID: string, hideSuccess?: boolean) => ProfileSettings;
  profileSettings: ProfileSettings;
  setProfileSettings: React.Dispatch<React.SetStateAction<ProfileSettings>>;
  loadProfiles: (hideSuccess?: boolean) => void;
  addProfile: (newProfile: string, hideSuccess?: boolean) => void;
  removeProfile: (id: string, hideSuccess?: boolean) => void;
  validateProfile: (newProfile: string) => boolean;
}

const ProfileContext = createContext<ProfileContextType | undefined>(undefined);

export function ProfileProvider({ children }: { children: React.ReactNode }) {
  const { appLog } = useLog();
  const [profileFileList, setProfileFileList] = useState<string[]>();
  const [profileList, setProfileList] = useState([
    { id: "default", name: "Default" },
  ]);
  const [activeProfileID, setActiveProfileID] = useState<string>("");
  const [activeProfile, setActiveProfile] =
    useState<ProfileSettings>(emptyProfileSettings);
  const [profileSettings, setProfileSettings] =
    useState<ProfileSettings>(emptyProfileSettings);

  const writeProfile = (profileToSave: ProfileSettings) => {
    appLog(JSON.stringify(profileToSave), "Saving profile settings");
    const fileName = ProfileKey + profileToSave.id;
    writeLocalStorage(fileName, profileToSave);
  };

  const readProfile = (profileID: string): ProfileSettings => {
    // Ensure File Name has ProfileKey
    const fileName = profileID.includes(ProfileKey)
      ? profileID
      : ProfileKey + profileID;

    // Read Profile Settings from Local Storage
    const storedSettings = readLocalStorage(fileName);
    if (storedSettings) {
      // setProfileSettings(storedSettings);
      appLog(
        [profileSettings.id, profileSettings.name],
        "Loaded profile settings"
      );
      return storedSettings;
    } else {
      appLog("No stored settings found", "Loaded Default Profile Settings");
      // setProfileSettings(defaultProfileSettings);
      return emptyProfileSettings;
    }
  };

  const loadProfiles = (showSuccess = false) => {
    try {
      // Get all profiles from local storage
      const storedProfiles = getLocalStorageProfiles();
      if (storedProfiles) {
        setProfileFileList(storedProfiles);
        appLog(JSON.stringify(profileFileList), "Loaded profile files");
      }

      // Set Profile List
      storedProfiles.forEach((profile) => {
        let profileSettings = readProfile(profile);

        setProfileList((prevState) => {
          const updatedProfiles = [
            ...prevState,
            { id: profileSettings.id, name: profileSettings.name },
          ];

          return updatedProfiles;
        });
        appLog(JSON.stringify(profileList), "Loaded Profile List");
        appLog(
          [profileSettings.id, profileSettings.name],
          "Loaded profile settings"
        );
      });

      // Set Active Profile to Default
      setActiveProfileID("default");

      // Load Default Profile Settings
      readProfile("default");

      showSuccess
        ? postToast("positive", "Profiles loaded successfully", appLog)
        : appLog("Profiles loaded successfully");
    } catch (error) {
      error instanceof Error
        ? postToast("negative", error.message, appLog)
        : postToast("negative", "Something went wrong trying to load", appLog);
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
      appLog([newProfileID, newProfileName], "Adding Profile");

      let newProfile: ProfileSettings = emptyProfileSettings;
      newProfile.id = newProfileID;
      newProfile.name = newProfileName;

      try {
        // Update Profile List (State)
        setProfileList((prevState) => {
          const updatedProfiles = [
            ...prevState,
            { id: newProfile.id, name: newProfile.name },
          ];
          return updatedProfiles;
        });

        // Write Profile to Local Storage
        writeProfile(newProfile);

        appLog(JSON.stringify(profileList), "Updated Profile List");
        showSuccess
          ? postToast("positive", `Added profile: ${newProfile}`, appLog)
          : appLog(`Added profile: ${newProfile.id}`);
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
      deleteLocalStorage(fileName);
      setProfileList((prevState) => {
        const updatedProfiles = [...prevState.filter((item) => id !== item.id)];
        return updatedProfiles;
      });
      showSuccess
        ? postToast("positive", `Removed profile: ${id}`)
        : appLog(`Removed profile: ${id}`);
    } catch (error) {
      error instanceof Error
        ? postToast("negative", error.message)
        : postToast(
            "negative",
            "Something went wrong trying to remove profile"
          );
    }
  };

  useEffect(() => {
    loadProfiles();
  }, []);

  useEffect(() => {
    setActiveProfile(readProfile(activeProfileID));
  }, [activeProfileID]);

  const value = {
    activeProfileID,
    setActiveProfileID,
    activeProfile,
    setActiveProfile,
    profileList,
    writeProfile,
    readProfile,
    profileSettings,
    setProfileSettings,
    loadProfiles,
    addProfile,
    removeProfile,
    validateProfile,
    emptyProfileSettings,
  };

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
