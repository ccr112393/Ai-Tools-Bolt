import type { Selection } from "@adobe/react-spectrum";
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
  Text,
  TextField,
  View,
  Well,
} from "@adobe/react-spectrum";
import Add from "@spectrum-icons/workflow/Add";
import ChevronLeft from "@spectrum-icons/workflow/ChevronLeft";
import Delete from "@spectrum-icons/workflow/Delete";
import { useState } from "react";
import { componentGap, componentGapDouble } from "../../../utils";
import { useColorContext, useTabContext } from "../contexts";
import { set } from "lodash";

export const ColorView = () => {
  const { colorList, addColor, removeColor, saveColorList, loadColorList } =
    useColorContext();
  const [newColor, setNewColor] = useState("");

  const removeSelectedColors = (selected: Selection) => {
    const selectedArray = Array.from(selected);
    selectedArray.forEach((id) => {
      removeColor(id.toString());
    });

    setTimeout(() => {
      clearSelectedKeys();
    }, 100);
  };

  const handleAddColor = () => {
    addColor(newColor);
    setNewColor("");
  };

  const [selectedKeys, setSelectedKeys] = useState<Selection>(
    new Set<string>()
  );

  const clearSelectedKeys = () => {
    setSelectedKeys(new Set());
  };

  const { setSelectedTab } = useTabContext();

  const handleBack = () => {
    setNewColor("");
    saveColorList();
    loadColorList();
    setSelectedTab("signagent");
  };

  return (
    <View marginTop={componentGapDouble}>
      <Flex direction={"row"} gap={componentGap} alignItems={"center"}>
        <ActionButton isQuiet onPress={() => handleBack()}>
          <ChevronLeft />
        </ActionButton>
        <Heading level={3}>Manage Colors</Heading>
      </Flex>
      <Content>
        <Flex
          direction={"row"}
          alignItems={"end"}
          justifyContent={"center"}
          marginBottom={componentGap}
        >
          <TextField
            value={newColor}
            onChange={setNewColor}
            marginEnd={componentGap}
            flex
            label="Field Name"
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleAddColor();
              }
            }}
            contextualHelp={
              <ContextualHelp>
                <Heading>Adding Fields</Heading>
                <Content>
                  Enter the name of the color <i>field</i>, not the color. Field
                  names are formatted automatically:
                  <Well>Sign Color {"→"} sign_color</Well>
                </Content>
              </ContextualHelp>
            }
          />

          <ActionButton
            aria-label="Add"
            onPress={() => {
              handleAddColor();
            }}
          >
            <Add />
          </ActionButton>
        </Flex>
        <ActionBarContainer>
          <ListBox
            selectionMode="multiple"
            items={colorList}
            onSelectionChange={(selected) => setSelectedKeys(selected)}
            // height={"size-3000"}
          >
            {(items) => <Item key={items.id}>{items.name}</Item>}
          </ListBox>
          <ActionBar
            selectedItemCount={
              selectedKeys === "all" ? "all" : selectedKeys.size
            }
            onClearSelection={() => clearSelectedKeys()}
            onAction={(action) => {
              action === "delete" && removeSelectedColors(selectedKeys);
            }}
          >
            <Item key="delete">
              <Delete />
              <Text>Delete</Text>
            </Item>
          </ActionBar>
        </ActionBarContainer>
      </Content>
    </View>
  );
};
