import {
  Button,
  Checkbox,
  Flex,
  Grid,
  Heading,
  Text,
  TextField,
  Radio,
  RadioGroup,
} from "@adobe/react-spectrum";
import { useState } from "react";
import { evalTS } from "../../lib/utils/bolt";
import { postToast } from "./util";

export function RenameComponent() {
  const [textFind, setTextFind] = useState("");
  const [textReplace, setTextReplace] = useState("");
  const [selectedOption, setSelectedOption] = useState("layers");
  return (
    <>
      <Heading>Rename</Heading>
      <Grid
        areas={["label field"]}
        alignItems={"center"}
        maxWidth={"size-4600"}
      >
        <Text>Find</Text>
        <TextField value={textFind} onChange={setTextFind} />
        <Text>Replace</Text>
        <TextField
          marginTop={"size-100"}
          value={textReplace}
          onChange={setTextReplace}
        />
        <RadioGroup
          value={selectedOption}
          onChange={setSelectedOption}
          gridColumnStart={"field"}
          marginTop={"size-100"}
        >
          <Radio value="layers">Rename Layers</Radio>
          <Radio value="paths">Rename Path Items</Radio>
          <Radio value="selection">Rename Selected Path Items</Radio>
        </RadioGroup>
      </Grid>

      <Flex justifyContent={"end"} marginTop={"size-200"}>
        <Button
          variant="primary"
          onPress={() => {
            if (textFind != "") {
              handleApply(selectedOption, textFind, textReplace).then(
                (result) => {
                  if (result.countRename > 0) {
                    switch (selectedOption) {
                      case "layers":
                        postToast(
                          "positive",
                          `${result.countRename} ${
                            result.countRename == 1 ? "layer" : "layers"
                          } renamed`
                        );
                        break;

                      case "paths":
                        postToast(
                          "positive",
                          `${result.countRename} ${
                            result.countRename == 1 ? "item" : "items"
                          } renamed`
                        );
                        break;

                      case "selection":
                        postToast(
                          "positive",
                          `${result.countRename} ${
                            result.countRename == 1 ? "item" : "items"
                          } renamed`
                        );
                        break;

                      default:
                        break;
                    }
                  } else {
                    postToast("info", "Nothing to rename");
                  }
                }
              );
            } else {
              postToast("negative", "Find cannot be empty");
            }
          }}
        >
          Apply
        </Button>
      </Flex>
    </>
  );
}

async function handleApply(
  selection: string,
  textFind: string,
  textReplace: string
): Promise<{
  countRename: number;
}> {
  let countRename = 0;

  switch (selection) {
    case "layers":
      await evalTS("renameLayers", textFind, textReplace).then((result) => {
        countRename = result;
      });
      break;

    case "paths":
      await evalTS("renamePathItems", textFind, textReplace).then((result) => {
        countRename = result;
      });
      break;

    case "selection":
      await evalTS("renameSelectedPaths", textFind, textReplace).then(
        (result) => {
          countRename = result;
        }
      );
      break;

    default:
      break;
  }

  return { countRename };
}
