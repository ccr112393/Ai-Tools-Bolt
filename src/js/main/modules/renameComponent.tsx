import {
  Button,
  Checkbox,
  Flex,
  Grid,
  Heading,
  Text,
  TextField,
} from "@adobe/react-spectrum";
import { useState } from "react";
import { evalTS } from "../../lib/utils/bolt";
import { postToast } from "./util";

export function RenameComponent() {
  const [textFind, setTextFind] = useState("");
  const [textReplace, setTextReplace] = useState("");
  const [renameLayers, setRenameLayers] = useState(false);
  const [renamePathItems, setRenamePathItems] = useState(false);
  const [selectionOnly, setSelectionOnly] = useState(false);
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
        <Checkbox
          gridColumnStart={"field"}
          marginTop={"size-100"}
          isSelected={renameLayers}
          onChange={setRenameLayers}
        >
          Rename Layers
        </Checkbox>
        <Checkbox
          gridColumnStart={"field"}
          isSelected={renamePathItems}
          onChange={setRenamePathItems}
        >
          Rename Path Items
        </Checkbox>
        <Checkbox
          gridColumnStart={"field"}
          isSelected={selectionOnly}
          onChange={setSelectionOnly}
        >
          Selection Only
        </Checkbox>
      </Grid>

      <Flex justifyContent={"end"}>
        <Button
          variant="primary"
          onPress={() => {
            if (
              textFind != "" &&
              (renameLayers || renamePathItems || selectionOnly)
            ) {
              handleApply(
                renameLayers,
                renamePathItems,
                selectionOnly,
                textFind,
                textReplace
              ).then((result) => {
                let sum =
                  result.countLayers +
                  result.countPathItems +
                  result.countSelection;
                sum > 0
                  ? postToast("positive", `${sum} object(s) renamed`)
                  : postToast("info", "No objects renamed");
              });
            } else {
              textFind == ""
                ? postToast("negative", "Find cannot be empty")
                : postToast("negative", "Select at least one option");
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
  renameLayers: boolean,
  renamePathItems: boolean,
  selectionOnly: boolean,
  textFind: string,
  textReplace: string
): Promise<{
  countSelection: number;
  countLayers: number;
  countPathItems: number;
}> {
  var countSelection = 0;
  var countLayers = 0;
  var countPathItems = 0;

  // Rename Selection (All)
  if (
    (selectionOnly && renameLayers && renamePathItems) ||
    (selectionOnly && !renameLayers && !renamePathItems)
  ) {
    console.log("Rename Selection All");
    await evalTS("renameSelection", textFind, textReplace).then((result) => {
      countSelection = result;
    });
  }

  // Rename Selected Layers
  if (selectionOnly && renameLayers && !renamePathItems) {
    console.log("Rename Selected Layers");
    await evalTS("renameSelectedLayers", textFind, textReplace).then(
      (result) => {
        countLayers = result;
      }
    );
  }

  // Rename Selected Path Items
  if (selectionOnly && !renameLayers && renamePathItems) {
    console.log("Rename Selected Path Items");
    await evalTS("renameSelectedPaths", textFind, textReplace).then(
      (result) => {
        countPathItems = result;
      }
    );
  }

  // Rename All Layers and Path Items
  if (!selectionOnly && renameLayers && renamePathItems) {
    console.log("Rename All Layers and Path Items");
    await evalTS("renameLayers", textFind, textReplace).then((result) => {
      countLayers = result;
    });
    await evalTS("renamePathItems", textFind, textReplace).then((result) => {
      countPathItems = result;
    });
  }

  // Rename All Layers
  if (!selectionOnly && renameLayers && !renamePathItems) {
    console.log("Rename All Layers");
    await evalTS("renameLayers", textFind, textReplace).then((result) => {
      countLayers = result;
    });
  }
  // Rename All Path Items
  if (!selectionOnly && !renameLayers && renamePathItems) {
    console.log("Rename All Path Items");
    await evalTS("renamePathItems", textFind, textReplace).then((result) => {
      countPathItems = result;
    });
  }

  return { countLayers, countPathItems, countSelection };
}
