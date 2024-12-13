import {
  Button,
  Checkbox,
  Flex,
  Grid,
  Heading,
  Icon,
  Text,
  TextField,
} from "@adobe/react-spectrum";
import { ModuleType } from "./moduleType";
import { useState } from "react";
import { evalTS } from "../../lib/utils/bolt";
import { postToast } from "./util";

function RenameContent() {
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
            if (textFind != "") {
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

  // DEBUG
  console.log(
    `${renameLayers}, ${renamePathItems}, ${selectionOnly}, ${textFind}, ${textReplace}`
  );
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

export const RenameIcon = (
  <Icon>
    <svg x="0px" y="0px" viewBox="0 0 18 18">
      <rect x="15.5" width="1" height="18" />
      <path
        d="M12.8,15.9l-5-13.7C7.8,2,7.8,2,7.7,2H5.6C5.6,2,5.5,2,5.5,2.1c0,0,0,0,0,0v0c0,0.3,0,0.6-0.2,0.9L0.7,15.8
	c0,0.1,0,0.2,0.1,0.2h1.4c0.1,0,0.2,0,0.2-0.1L4,11.5h5.3l1.6,4.4C11,16,11,16,11.1,16h1.6C12.8,16,12.8,15.9,12.8,15.9z M6.7,3.4
	L6.7,3.4c0.4,1.4,1.7,5,2.2,6.6H4.5C5.3,7.7,6.3,4.7,6.7,3.4z"
      />
    </svg>
  </Icon>
);

export default RenameContent;

export const RenameModule: ModuleType = {
  key: "rnm",
  name: "Rename",
  component: RenameContent,
  icon: RenameIcon,
};
