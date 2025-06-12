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
  TextField,
  Text,
  Well,
} from "@adobe/react-spectrum";
import { useState } from "react";
import {
  componentGap,
  componentWidth,
  iconMarginAdjust,
  postToast,
  writeLocalStorage,
} from "../../../utils";
import { formatFieldName } from "../hooks";
import { SignAgentColor, SignAgentColorList } from "./ColorDisclosure";
import type { Selection } from "@adobe/react-spectrum";
import Add from "@spectrum-icons/workflow/Add";
import Delete from "@spectrum-icons/workflow/Delete";
import { clear } from "console";

export interface ColorFieldsDialogProps {
  colorList: SignAgentColor[];
  setColorList: React.Dispatch<React.SetStateAction<SignAgentColor[]>>;
}

export const ColorFieldsDialog: React.FC<ColorFieldsDialogProps> = ({
  colorList,
  setColorList,
}) => {
  const [newColor, setNewColor] = useState("");

  const saveColorList = () => {
    const settings: SignAgentColorList = {
      colorList,
    };
    writeLocalStorage("colorList", settings);
  };

  const removeSelectedColors = (selected: Selection) => {
    const selectedArray = Array.from(selected);
    const newColorList = colorList.filter(
      (color) => !selectedArray.includes(color.id)
    );
    setColorList(newColorList);
    saveColorList();

    setTimeout(() => {
      clearSelectedKeys();
    }, 100);
  };

  const addColor = () => {
    if (newColor !== "") {
      const existingColor = colorList.find(
        (color) => color.id === formatFieldName(newColor)
      );
      if (existingColor) {
        postToast("negative", `Field name "${newColor}" already exists`);
      } else {
        setColorList((prevItems) => [
          ...prevItems,
          {
            id: formatFieldName(newColor),
            name: newColor,
          },
        ]);
        setNewColor("");
      }
    } else {
      postToast("negative", "Field name cannot be empty");
    }
  };

  const [selectedKeys, setSelectedKeys] = useState<Selection>(
    new Set<string>()
  );

  const clearSelectedKeys = () => {
    setSelectedKeys(new Set());
  };

  return (
    <>
      <DialogTrigger isDismissable>
        <ActionButton
          gridColumn={"field"}
          width={componentWidth}
          alignSelf={"end"}
        >
          Manage Colors
        </ActionButton>
        {(closeDialog) => (
          <div>
            <Dialog
              size="S"
              onDismiss={() => {
                saveColorList();
                closeDialog();
              }}
            >
              <Heading marginTop={componentGap}>Manage Color Fields</Heading>
              <Divider />
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
                        addColor();
                      }
                    }}
                    contextualHelp={
                      <ContextualHelp>
                        <Heading>Adding Fields</Heading>
                        <Content>
                          Enter the name of the color <i>field</i>, not the
                          color. Field names are formatted automatically:
                          <Well>Sign Color {"→"} sign_color</Well>
                        </Content>
                      </ContextualHelp>
                    }
                  />

                  <ActionButton
                    aria-label="Add"
                    onPress={() => {
                      addColor();
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
                      <Delete marginStart={iconMarginAdjust} />
                      <Text>Delete</Text>
                    </Item>
                  </ActionBar>
                </ActionBarContainer>
              </Content>
            </Dialog>
          </div>
        )}
      </DialogTrigger>
    </>
  );
};
