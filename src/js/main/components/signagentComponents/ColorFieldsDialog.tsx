import {
  DialogTrigger,
  ActionButton,
  Dialog,
  Heading,
  Divider,
  Content,
  Flex,
  TextField,
  ContextualHelp,
  Well,
  TagGroup,
  Item,
} from "@adobe/react-spectrum";
import { useState } from "react";

import {
  componentWidth,
  componentGap,
  formatFieldName,
  postToast,
} from "../../modules/util";
import { SignAgentColor } from "./ColorDisclosure";

export interface ColorFieldsDialogProps {
  colorList: SignAgentColor[];
  setColorList: React.Dispatch<React.SetStateAction<SignAgentColor[]>>;
}

export const ColorFieldsDialog: React.FC<ColorFieldsDialogProps> = ({
  colorList,
  setColorList,
}) => {
  const [newColor, setNewColor] = useState("");
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
        <Dialog size="S">
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
                contextualHelp={
                  <ContextualHelp variant="help">
                    <Content marginTop={0}>
                      Enter the name of the color <i>field</i>, not the color.
                      Field names are formatted automatically:
                      <Well>Sign Color {"→"} sign_color</Well>
                    </Content>
                  </ContextualHelp>
                }
              />
              <ActionButton
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
              </ActionButton>
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
