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
  ListBox,
  TagGroup,
  TextField,
  Tooltip,
  TooltipTrigger,
} from "@adobe/react-spectrum";
import { useState } from "react";
import { componentGap, componentWidth, postToast } from "../../../utils";
import { useProfile } from "../contexts";
import type { Selection } from "@adobe/react-spectrum";

export const ProfilesDialog = () => {
  const { addProfile, removeProfile, getProfileListNoDefault } = useProfile();
  const [newProfile, setNewProfile] = useState("");

  const handleAddProfile = () => {
    postToast("positive", `Adding profile: ${newProfile}`);
    addProfile(newProfile);
    setNewProfile("");
  };

  const [selectedKeys, setSelectedKeys] = useState<Selection>(
    new Set<string>()
  );

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
            <ListBox
              selectionMode="multiple"
              items={getProfileListNoDefault()}
              onSelectionChange={(selected) => setSelectedKeys(selected)}
            >
              {(items) => <Item key={items.id}>{items.name}</Item>}
            </ListBox>
          </Content>
        </Dialog>
      )}
    </DialogTrigger>
  );
};
