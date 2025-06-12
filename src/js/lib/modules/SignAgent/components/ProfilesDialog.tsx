import {
  ActionBar,
  ActionBarContainer,
  ActionButton,
  Content,
  ContextualHelp,
  Dialog,
  DialogTrigger,
  Divider,
  Flex,
  Heading,
  Item,
  ListBox,
  Text,
  TextField,
} from "@adobe/react-spectrum";
import { useState } from "react";
import {
  componentGap,
  componentWidth,
  iconMarginAdjust,
  postToast,
} from "../../../utils";
import { useProfile } from "../contexts";
import type { Selection } from "@adobe/react-spectrum";
import Add from "@spectrum-icons/workflow/Add";
import Delete from "@spectrum-icons/workflow/Delete";
import { clear } from "console";

export const ProfilesDialog = () => {
  const { addProfile, removeProfile, getProfileListNoDefault } = useProfile();
  const [newProfile, setNewProfile] = useState("");

  const [selectedKeys, setSelectedKeys] = useState<Selection>(
    new Set<string>()
  );

  const clearSelectedKeys = () => {
    setSelectedKeys(new Set());
  };

  const handleAddProfile = () => {
    addProfile(newProfile);
    setNewProfile("");
  };

  const removeSelectedProfiles = (selected: Selection) => {
    const selectedArray = Array.from(selected);
    selectedArray.forEach((key) => {
      removeProfile(key.toString());
    });
    setTimeout(() => {
      clearSelectedKeys();
    }, 100);
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
                contextualHelp={
                  <ContextualHelp>
                    <Heading>Adding Profiles</Heading>
                    <Content>
                      Enter a name for the new profile and press Enter or click
                      Add to create a new profile with the current settings.
                    </Content>
                  </ContextualHelp>
                }
              />
              <ActionButton
                aria-label="Add"
                onPress={() => {
                  handleAddProfile();
                }}
              >
                <Add />
              </ActionButton>
            </Flex>
            <ActionBarContainer>
              <ListBox
                selectionMode="multiple"
                items={getProfileListNoDefault()}
                onSelectionChange={(selected) => setSelectedKeys(selected)}
              >
                {(items) => <Item key={items.id}>{items.name}</Item>}
              </ListBox>
              <ActionBar
                selectedItemCount={
                  selectedKeys === "all" ? "all" : selectedKeys.size
                }
                onClearSelection={() => clearSelectedKeys()}
                onAction={(action) => {
                  action === "delete" && removeSelectedProfiles(selectedKeys);
                }}
              >
                <Item key="delete">
                  <Delete marginStart={iconMarginAdjust} />
                  <Text>Delete</Text>
                </Item>
              </ActionBar>
            </ActionBarContainer>
          </Content>
        </Dialog>
      )}
    </DialogTrigger>
  );
};
