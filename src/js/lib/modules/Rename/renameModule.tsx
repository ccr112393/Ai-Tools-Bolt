import { Button, Checkbox, Heading, Text, TextField, Radio, RadioGroup } from "@react-spectrum/s2";
import { style } from "@react-spectrum/s2/style" with { type: "macro" };
import { useState } from "react";
import { evalTS } from "../../utils/bolt";
import { postToast } from "../../utils";

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

export function RenameComponent() {
  const [textFind, setTextFind] = useState("");
  const [textReplace, setTextReplace] = useState("");
  const [selectedOption, setSelectedOption] = useState("layers");
  return (
    <>
      <Heading level={2}>Rename</Heading>
      <div
        className={style({
          display: "grid",
          gridTemplateAreas: ["label field"],
          alignItems: "center",
          maxWidth: 368
        })}>
        <Text>Find</Text>
        <TextField value={textFind} onChange={setTextFind} />
        <Text>Replace</Text>
        <TextField
          value={textReplace}
          onChange={setTextReplace}
          styles={style({
            marginTop: 8
          })}
        />
        <RadioGroup
          value={selectedOption}
          onChange={setSelectedOption}
          gridColumnStart={"field"}
          styles={style({
            marginTop: 8
          })}
        >
          <Radio value="layers">Rename Layers</Radio>
          <Radio value="paths">Rename Path Items</Radio>
          <Radio value="selection">Rename Selected Path Items</Radio>
        </RadioGroup>
      </div>
      <div
        className={style({
          display: "flex",
          justifyContent: "end",
          marginTop: 16
        })}>
        <Button
          variant="accent"
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
      </div>
    </>
  );
}
