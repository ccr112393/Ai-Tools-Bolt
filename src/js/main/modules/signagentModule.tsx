import {
  Accordion,
  ActionButton,
  ActionGroup,
  Button,
  Checkbox,
  Content,
  ContextualHelp,
  Dialog,
  DialogTrigger,
  Disclosure,
  DisclosurePanel,
  DisclosureTitle,
  Divider,
  Flex,
  Grid,
  Header,
  Heading,
  Item,
  Link,
  Picker,
  StatusLight,
  TagGroup,
  Text,
  TextField,
  Well,
} from "@adobe/react-spectrum";
import Erase from "@spectrum-icons/workflow/Erase";
import Import from "@spectrum-icons/workflow/Import";
import SaveAsFloppy from "@spectrum-icons/workflow/SaveAsFloppy";
import { useState } from "react";
import { openLinkInBrowser } from "../../lib/utils/bolt";
import { NumberFieldDefault, UnitPicker } from "../components";
import {
  componentGap,
  componentWidth,
  componentWidthHalf,
  iconMarginAdjust,
  postToast,
} from "./util";

const SignAgentDisclaimer = () => {
  return (
    <ContextualHelp variant="info">
      <Heading>Disclaimer</Heading>
      <Content>
        <Text>
          I am <i>not</i> affiliated with SignAgent™.
          <p>
            To learn more, visit their website at{" "}
            <Link
              isQuiet
              onPress={(e) => openLinkInBrowser("https://signagent.com")}
            >
              signagent.com
            </Link>
            .
          </p>
        </Text>
      </Content>
    </ContextualHelp>
  );
};

export function SignAgentComponent() {
  const [hasHorizontalJustify, setHasHorizontalJustify] = useState(true);
  const [hasVerticallJustify, setHasVerticalJustify] = useState(true);
  const [horizontalJustify, setHorizontalJustify] = useState("left");
  const [verticallJustify, setVerticalJustify] = useState("top");
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
  const [newColor, setNewColor] = useState("");

  return (
    <Flex direction={"column"} alignSelf={"center"}>
      <Heading level={2}>SignAgent™ Tools</Heading>
      <Accordion allowsMultipleExpanded>
        <Disclosure id="gettingStarted">
          <DisclosureTitle>
            <Text flex>Getting Started</Text>
            <SignAgentDisclaimer />
          </DisclosureTitle>
          <DisclosurePanel>
            <Content>
              <Text>
                Use this tool to rename the currently selected bounding box(es)
                with the selected command(s).
                <br />
                <br />
                For example, assume we've selected horizontal center, vertical
                middle, uppercase, and leading 28 pt. The selected bounding box
                would be renamed to:
              </Text>
              <Well marginY={componentGap}>
                center, middle, uppercase, leading: 28 pt
              </Well>
              <StatusLight variant="info">
                Status Light will turn blue when section has selection
              </StatusLight>
            </Content>
          </DisclosurePanel>
        </Disclosure>
        <Disclosure id="justification">
          <DisclosureTitle>
            <Text flex>Justification</Text>
            <StatusLight
              isDisabled={!hasHorizontalJustify && !hasVerticallJustify}
              variant="info"
              marginTop={-7}
              marginBottom={-10}
            />
            <ContextualHelp variant="help">
              {/* <Heading>Justification</Heading> */}
              <Content marginTop={0}>
                <Text>Add formatting commands for justification.</Text>
                <Well marginTop={componentGap}>center, middle</Well>
              </Content>
            </ContextualHelp>
          </DisclosureTitle>

          <DisclosurePanel>
            <Grid
              areas={["label field"]}
              alignItems={"center"}
              maxWidth={"size-4600"}
              gap={"size-100"}
            >
              <Checkbox
                isSelected={hasHorizontalJustify}
                onChange={setHasHorizontalJustify}
              >
                Horizontal
              </Checkbox>
              <Picker
                width={componentWidth}
                selectedKey={horizontalJustify}
                onSelectionChange={(key) => setHorizontalJustify(key as string)}
              >
                <Item key="left">Left</Item>
                <Item key="center">Center</Item>
                <Item key="right">Right</Item>
              </Picker>

              <Checkbox
                isSelected={hasVerticallJustify}
                onChange={setHasVerticalJustify}
              >
                Vertical
              </Checkbox>
              <Picker
                width={componentWidth}
                selectedKey={verticallJustify}
                onSelectionChange={(key) => setVerticalJustify(key as string)}
              >
                <Item key="top">Top</Item>
                <Item key="middle">Middle</Item>
                <Item key="bottom">Bottom</Item>
              </Picker>
            </Grid>
          </DisclosurePanel>
        </Disclosure>
        <Disclosure id="color">
          <DisclosureTitle>
            <Text flex>Color</Text>
            <StatusLight
              isDisabled={!hasColor && !hasFillColor && !hasStrokeColor}
              variant="info"
              marginTop={-7}
              marginBottom={-10}
            />
            <ContextualHelp variant="help">
              {/* <Heading>Color</Heading> */}
              <Content marginTop={0}>
                <Text>
                  Add formatting commands for dynamic colors, using field names
                  defined within SignAgent.
                </Text>
                <Well marginTop={componentGap}>
                  strokecolor: copy_color, fillcolor: sign_color
                </Well>
              </Content>
            </ContextualHelp>
          </DisclosureTitle>
          <DisclosurePanel>
            <Grid
              areas={["label field"]}
              alignItems={"center"}
              maxWidth={"size-4600"}
              gap={"size-100"}
            >
              <Checkbox isSelected={hasColor} onChange={setHasColor}>
                Color
              </Checkbox>
              <Picker
                width={componentWidth}
                items={colorList}
                selectedKey={color}
                onSelectionChange={(key) => setColor(key as string)}
              >
                {(item) => <Item key={item.id}>{item.name}</Item>}
              </Picker>

              <Checkbox isSelected={hasFillColor} onChange={setHasFillColor}>
                Fill Color
              </Checkbox>
              <Picker
                width={componentWidth}
                items={colorList}
                selectedKey={fillColor}
                onSelectionChange={(key) => setFillColor(key as string)}
              >
                {(item) => <Item key={item.id}>{item.name}</Item>}
              </Picker>

              <Checkbox
                isSelected={hasStrokeColor}
                onChange={setHasStrokeColor}
              >
                Stroke Color
              </Checkbox>
              <Picker
                width={componentWidth}
                items={colorList}
                selectedKey={strokeColor}
                onSelectionChange={(key) => setStrokeColor(key as string)}
              >
                {(item) => <Item key={item.id}>{item.name}</Item>}
              </Picker>
              <DialogTrigger isDismissable>
                <Button
                  variant="secondary"
                  gridColumn={"field"}
                  width={componentWidth}
                  alignSelf={"end"}
                >
                  Edit Colors
                </Button>
                {(closeDialog) => (
                  <Dialog size="S">
                    <Heading marginTop={componentGap}>Color Fields</Heading>
                    <Header marginTop={componentGap}>
                      <ContextualHelp
                        variant="help"
                        placement="bottom end"
                        marginEnd={-30}
                      >
                        <Heading>Editing Color Fields</Heading>
                        <Content>
                          <Heading level={4} marginBottom={2} marginTop={0}>
                            Add Fields
                          </Heading>
                          <Text>
                            Enter the name of the color <i>field</i>, not the
                            color. Field names are formatted automatically:
                            <Well>Sign Color {"→"} sign_color</Well>
                          </Text>
                          <Heading level={4} marginBottom={2}>
                            Delete Fields
                          </Heading>
                          <Text>Checked items will be deleted upon save.</Text>
                        </Content>
                      </ContextualHelp>
                    </Header>
                    <Divider />
                    <Content>
                      <Flex
                        direction={"row"}
                        justifyContent={"center"}
                        marginBottom={componentGap}
                      >
                        <TextField
                          value={newColor}
                          onChange={setNewColor}
                          marginEnd={componentGap}
                          flex
                        />
                        <ActionButton
                          onPress={() => {
                            if (newColor !== "") {
                              setColorList((prevItems) => [
                                ...prevItems,
                                {
                                  id: newColor
                                    .toLowerCase()
                                    .replace(/\s+/g, "_"),
                                  name: newColor,
                                },
                              ]);
                              setNewColor("");
                            } else {
                              postToast(
                                "negative",
                                "Field name cannot be empty"
                              );
                            }
                          }}
                        >
                          Add
                        </ActionButton>
                      </Flex>
                      <TagGroup
                        marginBottom={10}
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
                    {/* <ButtonGroup>
                      <Button variant="secondary" onPress={closeDialog}>
                        Cancel
                      </Button>
                      <Button variant="accent" onPress={closeDialog}>
                        Save
                      </Button>
                    </ButtonGroup> */}
                  </Dialog>
                )}
              </DialogTrigger>
            </Grid>
          </DisclosurePanel>
        </Disclosure>
        <Disclosure id="textcase">
          <DisclosureTitle>
            <Text flex>Text Options</Text>
            <StatusLight
              isDisabled={!hasTextCase}
              variant="info"
              marginTop={-7}
              marginBottom={-10}
            />
            <ContextualHelp variant="help">
              {/* <Heading>Text Options</Heading> */}
              <Content marginTop={0}>
                <Text>Add formatting commands for text.</Text>
                <Well marginTop={componentGap}>uppercase, leading: 28 pt</Well>
              </Content>
            </ContextualHelp>
          </DisclosureTitle>
          <DisclosurePanel>
            <Grid
              areas={["label field"]}
              alignItems={"center"}
              maxWidth={"size-4600"}
              gap={"size-100"}
            >
              <Checkbox isSelected={hasTextCase} onChange={setHasTextCase}>
                Text Case
              </Checkbox>
              <Picker
                selectedKey={textCase}
                onSelectionChange={(key) => {
                  setTextCase(key as string);
                }}
                width={componentWidth}
              >
                <Item key={"up"}>UPPERCASE</Item>
                <Item key={"lo"}>lowercase</Item>
                <Item key={"tc"}>Title Case</Item>
              </Picker>
              <Checkbox isSelected={hasLeading} onChange={setHasLeading}>
                Leading
              </Checkbox>
              <Flex width={componentWidth}>
                <NumberFieldDefault
                  width={componentWidthHalf}
                  marginEnd={componentGap}
                  value={leading}
                  onChange={setLeading}
                />
                <UnitPicker
                  abbreviate={true}
                  defaultSelectedKey={"point"}
                  width={componentWidthHalf}
                />
              </Flex>
            </Grid>
          </DisclosurePanel>
        </Disclosure>
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
