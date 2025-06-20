import {
  ActionBar,
  ActionBarContainer,
  ActionButton,
  Content,
  ContextualHelp,
  Flex,
  Heading,
  Item,
  ListBox,
  TextField,
  Tooltip,
  TooltipTrigger,
  View,
  Text,
} from "@adobe/react-spectrum";
import {
  componentGap,
  componentGapDouble,
  iconMarginAdjust,
} from "../../../utils";
import { useProfile, useTabContext } from "../contexts";
import { useState } from "react";
import Add from "@spectrum-icons/workflow/Add";
import Delete from "@spectrum-icons/workflow/Delete";
import type { Selection } from "@adobe/react-spectrum";
import ChevronLeft from "@spectrum-icons/workflow/ChevronLeft";

export const ProfileView = () => {
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

  const { setSelectedTab } = useTabContext();

  const handleManageProfiles = () => {
    setSelectedTab("signagent");
  };

  return (
    <View marginTop={componentGapDouble}>
      <Flex direction={"row"} gap={componentGap} alignItems={"center"}>
        <ActionButton isQuiet onPress={() => handleManageProfiles()}>
          <ChevronLeft />
        </ActionButton>
        <Heading level={3}>Manage Profiles</Heading>
      </Flex>
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
            label="Add Profile"
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleAddProfile();
              }
            }}
            contextualHelp={
              <ContextualHelp>
                <Heading>Adding Profiles</Heading>
                <Content>
                  Enter a name for the new profile and press Enter or click Add
                  to create a new profile with the current settings.
                </Content>
              </ContextualHelp>
            }
          />
          <TooltipTrigger>
            <ActionButton
              aria-label="Add"
              onPress={() => {
                handleAddProfile();
              }}
            >
              <Add />
            </ActionButton>
            <Tooltip>Click to add a new profile</Tooltip>
          </TooltipTrigger>
        </Flex>
        {getProfileListNoDefault().length <= 0 && (
          <>No Profiles. Try adding one!</>
        )}
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
    </View>
  );
};
