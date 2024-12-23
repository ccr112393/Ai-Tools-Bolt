import {
  ActionButton,
  Button,
  Content,
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
import { useProfile } from "../../contexts";
import { componentGap, componentWidth, postToast } from "../../modules";

export const ProfilesDialog = () => {
  const { profileList, addProfile, removeProfile } = useProfile();
  const [newProfile, setNewProfile] = useState("");

  const handleAddProfile = () => {
    postToast("positive", `Adding profile: ${newProfile}`);
    addProfile(newProfile);
    setNewProfile("");
  };

  const handleRemoveProfile = (key: string) => {
    removeProfile(key);
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
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleAddProfile();
                  }
                }}
              />
              <TooltipTrigger>
                <Button
                  variant="secondary"
                  onPress={() => {
                    handleAddProfile();
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
              items={profileList.filter((item) => item.id !== "default")}
              onRemove={(keys) => {
                keys.forEach((key) => handleRemoveProfile(key.toString()));
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
