import {
  ActionButton,
  Button,
  Content,
  ContextualHelp,
  Dialog,
  DialogTrigger,
  Divider,
  Flex,
  Heading,
  Item,
  TagGroup,
  TextField,
  Tooltip,
  TooltipTrigger,
} from "@adobe/react-spectrum";
import { useState } from "react";
import {
  componentGap,
  componentWidth,
  formatFieldName,
  postToast,
  SignAgentProfile,
  SignAgentProfileList,
  writeLocalStorage,
} from "../../modules";

export interface ProfileDialogProps {
  profiles: SignAgentProfile[];
  setProfiles: React.Dispatch<React.SetStateAction<SignAgentProfile[]>>;
}

export const ProfilesDialog: React.FC<ProfileDialogProps> = ({
  profiles,
  setProfiles,
}) => {
  const [newProfile, setNewProfile] = useState("");

  const saveProfileList = () => {
    const settings: SignAgentProfileList = {
      profiles,
    };
    writeLocalStorage("profiles", settings);
  };

  const validateProfile = (): boolean => {
    let valid = true;
    let message = "";
    if (newProfile === "") {
      message = "Profile name cannot be empty";
      valid = false;
    }
    if (profiles.find((item) => item.name === newProfile)) {
      message = "Profile name already exists";
      valid = false;
    }
    if (profiles.find((item) => item.id === formatFieldName(newProfile))) {
      message = "Profile name already exists";
      valid = false;
    }
    if (!valid) {
      postToast("negative", message);
    }
    return valid;
  };

  const addProfile = () => {
    if (newProfile !== "") {
      if (validateProfile()) {
        setProfiles((prevItems) => [
          ...prevItems,
          {
            id: formatFieldName(newProfile),
            name: newProfile,
          },
        ]);
        setNewProfile("");
      }
    }
  };
  return (
    <DialogTrigger isDismissable>
      <ActionButton
        gridColumn={"field"}
        width={componentWidth}
        alignSelf={"end"}
      >
        Manage Profiles
      </ActionButton>
      {(closeDialog) => (
        <Dialog
          size="S"
          onDismiss={() => {
            saveProfileList();
            closeDialog();
          }}
        >
          <Heading>Manage Profiles</Heading>
          <Divider />

          <Content>
            <Flex
              direction={"row"}
              alignItems={"end"}
              justifyContent={"center"}
              marginBottom={componentGap}
            >
              <TextField
                value={newProfile}
                onChange={setNewProfile}
                marginEnd={componentGap}
                flex
                label="Profile Name"
              />
              <TooltipTrigger>
                <Button
                  variant="secondary"
                  onKeyDown={(e) => {
                    e.key === "Enter" ? addProfile() : null;
                  }}
                  onPress={() => {
                    addProfile();
                  }}
                >
                  Add
                </Button>
                <Tooltip>
                  Create a new profile with the current selections.
                </Tooltip>
              </TooltipTrigger>
            </Flex>
            <TagGroup
              items={profiles.filter((item) => item.id !== "default")}
              onRemove={(keys) => {
                setProfiles((prevItems) =>
                  prevItems.filter((item) => !keys.has(item.id))
                );
              }}
            >
              {(item) => <Item key={item.id}>{item.name}</Item>}
            </TagGroup>
          </Content>
        </Dialog>
      )}
    </DialogTrigger>
  );
};
