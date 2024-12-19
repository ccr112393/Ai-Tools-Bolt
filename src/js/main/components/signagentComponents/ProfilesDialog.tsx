import {
  DialogTrigger,
  ActionButton,
  Dialog,
  Heading,
  Divider,
  Content,
  Flex,
  TextField,
  TagGroup,
  Item,
} from "@adobe/react-spectrum";
import { useState } from "react";
import {
  SignAgentProfileList,
  writeLocalStorage,
  componentWidth,
  componentGap,
  formatFieldName,
  postToast,
  SignAgentProfile,
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
              <ActionButton
                onPress={() => {
                  if (newProfile !== "") {
                    setProfiles((prevItems) => [
                      ...prevItems,
                      {
                        id: formatFieldName(newProfile),
                        name: newProfile,
                      },
                    ]);
                    setNewProfile("");
                  } else {
                    postToast("negative", "Profile name cannot be empty");
                  }
                }}
              >
                Add
              </ActionButton>
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
