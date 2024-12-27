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
  Well,
} from "@adobe/react-spectrum";
import { useState } from "react";

import { SignAgentColor, SignAgentColorList } from ".";
import {
  componentGap,
  componentWidth,
  postToast,
  writeLocalStorage,
} from "../../../utils";
import { formatFieldName } from "../hooks";

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

  return (
    <DialogTrigger isDismissable>
      <ActionButton
        gridColumn={"field"}
        width={componentWidth}
        alignSelf={"end"}
      >
        Manage Colors
      </ActionButton>
      {(closeDialog) => (
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
              />
              <TooltipTrigger>
                <Button
                  variant="secondary"
                  onPress={() => {
                    if (newColor !== "") {
                      setColorList((prevItems) => [
                        ...prevItems,
                        {
                          id: formatFieldName(newColor),
                          name: newColor,
                        },
                      ]);
                      setNewColor("");
                    } else {
                      postToast("negative", "Field name cannot be empty");
                    }
                  }}
                >
                  Add
                </Button>
                <Tooltip>
                  Enter the name of the color <i>field</i>, not the color. Field
                  names are formatted automatically:
                  <Well>Sign Color {"→"} sign_color</Well>
                </Tooltip>
              </TooltipTrigger>
            </Flex>
            <TagGroup
              marginTop={componentGap}
              marginBottom={componentGap}
              items={colorList}
              onRemove={(keys) =>
                setColorList((prevItems) =>
                  prevItems.filter((item) => !keys.has(item.id))
                )
              }
            >
              {(item) => <Item key={item.id}>{item.name}</Item>}
            </TagGroup>
          </Content>
        </Dialog>
      )}
    </DialogTrigger>
  );
};
