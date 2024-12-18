import {
  Accordion,
  ActionGroup,
  Button,
  Flex,
  Heading,
  Item,
  Text,
} from "@adobe/react-spectrum";
import Erase from "@spectrum-icons/workflow/Erase";
import Import from "@spectrum-icons/workflow/Import";
import SaveAsFloppy from "@spectrum-icons/workflow/SaveAsFloppy";
import { useState } from "react";
import { iconMarginAdjust } from "./util";

import { ColorDisclosure } from "../components/signagentComponents/ColorDisclosure";
import { GettingStartedDisclosure } from "../components/signagentComponents/GettingStartedDisclosure";
import { JustificationDisclosure } from "../components/signagentComponents/JustificationDisclosure";
import { TextOptionsDisclosure } from "../components/signagentComponents/TextOptionsDisclosure";

export function SignAgentComponent() {
  const [hasHorizontalJustify, setHasHorizontalJustify] = useState(true);
  const [hasVerticalJustify, setHasVerticalJustify] = useState(true);
  const [horizontalJustify, setHorizontalJustify] = useState("left");
  const [verticalJustify, setVerticalJustify] = useState("top");
  const [hasColor, setHasColor] = useState(true);
  const [hasFillColor, setHasFillColor] = useState(false);
  const [hasStrokeColor, setHasStrokeColor] = useState(false);
  const [color, setColor] = useState("signcolor");
  const [fillColor, setFillColor] = useState("signcolor");
  const [strokeColor, setStrokeColor] = useState("signcolor");
  const [hasTextCase, setHasTextCase] = useState(false);
  const [textCase, setTextCase] = useState("up");
  const [hasLeading, setHasLeading] = useState(false);
  const [leading, setLeading] = useState(3);
  const [colorList, setColorList] = useState([
    { id: "signcolor", name: "Sign Color" },
    { id: "textcolor", name: "Text Color" },
  ]);

  return (
    <Flex direction={"column"} alignSelf={"center"}>
      <Heading level={2}>SignAgent™ Tools</Heading>
      <Accordion allowsMultipleExpanded>
        <GettingStartedDisclosure />
        <JustificationDisclosure
          hasHorizontalJustify={hasHorizontalJustify}
          setHasHorizontalJustify={setHasHorizontalJustify}
          hasVerticalJustify={hasVerticalJustify}
          setHasVerticalJustify={setHasVerticalJustify}
          horizontalJustify={horizontalJustify}
          setHorizontalJustify={setHorizontalJustify}
          verticalJustify={verticalJustify}
          setVerticalJustify={setVerticalJustify}
        />
        <ColorDisclosure
          hasColor={hasColor}
          setHasColor={setHasColor}
          hasFillColor={hasFillColor}
          setHasFillColor={setHasFillColor}
          hasStrokeColor={hasStrokeColor}
          setHasStrokeColor={setHasStrokeColor}
          color={color}
          setColor={setColor}
          fillColor={fillColor}
          setFillColor={setFillColor}
          strokeColor={strokeColor}
          setStrokeColor={setStrokeColor}
          colorList={colorList}
          setColorList={setColorList}
        />
        <TextOptionsDisclosure
          hasTextCase={hasTextCase}
          setHasTextCase={setHasTextCase}
          textCase={textCase}
          setTextCase={setTextCase}
          hasLeading={hasLeading}
          setHasLeading={setHasLeading}
          leading={leading}
          setLeading={setLeading}
        />
      </Accordion>
      <Flex justifyContent={"space-between"} marginTop={"size-200"}>
        <ActionGroup buttonLabelBehavior="hide">
          <Item>
            <Import size="S" marginStart={iconMarginAdjust} />
            <Text>Read Selected Layer</Text>
          </Item>
          <Item>
            <SaveAsFloppy size="S" marginStart={iconMarginAdjust} />
            <Text>Save</Text>
          </Item>
          <Item>
            <Erase size="S" marginStart={iconMarginAdjust} />
            <Text>Clear</Text>
          </Item>
        </ActionGroup>
        <Button variant="accent">Apply</Button>
      </Flex>
    </Flex>
  );
}
