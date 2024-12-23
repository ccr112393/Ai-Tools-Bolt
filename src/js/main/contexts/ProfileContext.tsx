import React, { createContext, useContext, useState } from "react";
import {
  deleteLocalStorage,
  formatFieldName,
  getLocalStorageProfiles,
  postToast,
  readLocalStorage,
  writeLocalStorage,
} from "../modules";
import { useLog } from "./LogContext";

import { ProfileKey, ProfileSettings, emptyProfileSettings } from "../modules";

interface ProfileContextType {
  // States
  activeProfile: ProfileSettings;
  setActiveProfile: React.Dispatch<React.SetStateAction<ProfileSettings>>;
  profileList: { id: string; name: string }[];
  setProfileList: React.Dispatch<
    React.SetStateAction<{ id: string; name: string }[]>
  >;

  // Functions
  saveActiveProfile: (showSuccess?: boolean) => void;
  writeProfile: (settings: ProfileSettings, showSuccess?: boolean) => void;
  loadProfiles: (showSuccess?: boolean) => void;
  addProfile: (newProfile: string, showSuccess?: boolean) => void;
  removeProfile: (id: string, showSuccess?: boolean) => void;

  // Return Functions
  sortProfileList: (
    listToSort: { id: string; name: string }[]
  ) => { id: string; name: string }[];
  readProfile: (profileID: string, showSuccess?: boolean) => ProfileSettings;
  validateProfile: (newProfile: string) => boolean;
}

const ProfileContext = createContext<ProfileContextType | undefined>(undefined);

export function ProfileProvider({ children }: { children: React.ReactNode }) {
  const { appLog } = useLog();

  const [profileList, setProfileList] = useState([
    { id: "default", name: "Default" },
  ]);

  const [activeProfile, setActiveProfile] =
    useState<ProfileSettings>(emptyProfileSettings);

  const sortProfileList = (listToSort: { id: string; name: string }[]) => {
    let defaultProfile = listToSort.find((profile) => profile.id === "default");
    let sortedList = listToSort
      .filter((profile) => profile.id !== "default")
      .sort((a, b) => a.id.localeCompare(b.id));

    if (defaultProfile) {
      sortedList.unshift(defaultProfile);
    }
    appLog(JSON.stringify(listToSort), "--- CURRENT ---");
    appLog(JSON.stringify(sortedList), "--- SORTED ---");
    return sortedList;
  };

  const writeProfile = (profileToSave: ProfileSettings) => {
    const fileName = ProfileKey + profileToSave.id;
    writeLocalStorage(fileName, profileToSave);
  };

  const saveActiveProfile = (showSuccess = false) => {
    writeProfile(activeProfile);
    showSuccess
      ? postToast("positive", "Profile saved successfully", appLog)
      : null;
  };

  const readProfile = (profileID: string): ProfileSettings => {
    // Ensure File Name has ProfileKey
    const trimmedID = profileID.trim();
    const fileName = trimmedID.startsWith(ProfileKey)
      ? trimmedID
      : `${ProfileKey}${trimmedID}`;

    appLog(fileName, "--- READING PROFILE ---");
    // Read Profile Settings from Local Storage
    const storedSettings = readLocalStorage(fileName);
    if (storedSettings) {
      return storedSettings;
    } else {
      return emptyProfileSettings;
    }
  };

  const loadProfiles = (showSuccess = false) => {
    try {
      // Get all profiles from local storage
      const storedProfiles = getLocalStorageProfiles();

      if (storedProfiles && storedProfiles.length > 0) {
        const formattedProfileList = storedProfiles.map((profile) => {
          const profileInfo = readProfile(profile);
          return { id: profileInfo.id, name: profileInfo.name };
        });
        setProfileList(sortProfileList(formattedProfileList));
        setActiveProfile(readProfile("default"));
      }

      showSuccess
        ? postToast("positive", "Profiles loaded successfully", appLog)
        : null;
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
      const newProfile: ProfileSettings = {
        ...emptyProfileSettings,
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
          ? postToast("positive", `Added profile: ${newProfile}`, appLog)
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

      showSuccess
        ? postToast("positive", `Removed profile: ${id}`, appLog)
        : null;
    } catch (error) {
      error instanceof Error
        ? postToast("negative", error.message)
        : postToast(
            "negative",
            "Something went wrong trying to remove profile"
          );
    }
  };

  const value = {
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
    emptyProfileSettings,
    sortProfileList,
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
