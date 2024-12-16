import {
  Accordion,
  ActionButton,
  ActionGroup,
  Button,
  ButtonGroup,
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
  ListBox,
  Picker,
  Text,
  TextField,
} from "@adobe/react-spectrum";
import Erase from "@spectrum-icons/workflow/Erase";
import Import from "@spectrum-icons/workflow/Import";
import SaveAsFloppy from "@spectrum-icons/workflow/SaveAsFloppy";
import { useState } from "react";
import { NumberFieldDefault, UnitPicker } from "../components";
import {
  componentGap,
  componentWidth,
  componentWidthHalf,
  iconMarginAdjust,
} from "./util";
import { openLinkInBrowser } from "../../lib/utils/bolt";

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
  const [useHorizontalJustify, setUseHorizontalJustify] = useState(true);
  const [useVerticallJustify, setUseVerticalJustify] = useState(true);
  const [horizontalJustify, setHorizontalJustify] = useState("left");
  const [verticallJustify, setVerticalJustify] = useState("top");
  const [useColor, setUseColor] = useState(true);
  const [useFillColor, setUseFillColor] = useState(false);
  const [useStrokeColor, setUseStrokeColor] = useState(false);
  const [color, setColor] = useState("signcolor");
  const [fillColor, setFillColor] = useState("signcolor");
  const [strokeColor, setStrokeColor] = useState("signcolor");
  const [useTextCase, setUseTextCase] = useState(false);
  const [textCase, setTextCase] = useState("up");
  const [useLeading, setUseLeading] = useState(false);
  const [leading, setLeading] = useState(3);

  return (
    <Flex direction={"column"} alignSelf={"center"}>
      <Flex
        direction={"row"}
        alignItems={"center"}
        justifyContent={"space-between"}
      >
        <Heading level={2}>SignAgent™ Tools</Heading>
        <SignAgentDisclaimer />
      </Flex>

      <Accordion allowsMultipleExpanded>
        <Disclosure id="justification">
          <DisclosureTitle>Justification</DisclosureTitle>
          <DisclosurePanel>
            <Grid
              areas={["label field"]}
              alignItems={"center"}
              maxWidth={"size-4600"}
              gap={"size-100"}
            >
              <Checkbox
                isSelected={useHorizontalJustify}
                onChange={setUseHorizontalJustify}
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
                isSelected={useVerticallJustify}
                onChange={setUseVerticalJustify}
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
          <DisclosureTitle>Color</DisclosureTitle>
          <DisclosurePanel>
            <Grid
              areas={["label field"]}
              alignItems={"center"}
              maxWidth={"size-4600"}
              gap={"size-100"}
            >
              <Checkbox isSelected={useColor} onChange={setUseColor}>
                Color
              </Checkbox>
              <Picker
                width={componentWidth}
                selectedKey={color}
                onSelectionChange={(key) => setColor(key as string)}
              >
                <Item key="signcolor">Sign Color</Item>
              </Picker>

              <Checkbox isSelected={useFillColor} onChange={setUseFillColor}>
                Fill Color
              </Checkbox>
              <Picker
                width={componentWidth}
                selectedKey={fillColor}
                onSelectionChange={(key) => setFillColor(key as string)}
              >
                <Item key="signcolor">Sign Color</Item>
              </Picker>

              <Checkbox
                isSelected={useStrokeColor}
                onChange={setUseStrokeColor}
              >
                Stroke Color
              </Checkbox>
              <Picker
                width={componentWidth}
                selectedKey={strokeColor}
                onSelectionChange={(key) => setStrokeColor(key as string)}
              >
                <Item key="signcolor">Sign Color</Item>
              </Picker>
              <DialogTrigger>
                <Button
                  variant="secondary"
                  gridColumn={"field"}
                  width={componentWidth}
                  alignSelf={"end"}
                >
                  Edit Colors
                </Button>
                {(closeDialog) => (
                  <Dialog>
                    <Heading>Color Fields</Heading>
                    <Header>
                      <ContextualHelp variant="info">
                        <Heading>Editing Color Fields</Heading>
                        <Content>
                          <Heading level={4} marginBottom={2} marginTop={0}>
                            Add Fields
                          </Heading>
                          <Text>
                            Enter the name of the color <i>field</i>, not the
                            the color. Field names are automatically formatted:
                            <br />
                            Sign Color {"→"} sign_color
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
                      <TextField /> <ActionButton>Add</ActionButton>
                      <ListBox selectionMode="multiple" marginBottom={10}>
                        <Item key={"signcolor"}>Sign Color</Item>
                        <Item key={"copycolor"}>Copy Color</Item>
                      </ListBox>
                    </Content>
                    <ButtonGroup>
                      <Button variant="secondary" onPress={closeDialog}>
                        Cancel
                      </Button>
                      <Button variant="accent" onPress={closeDialog}>
                        Save
                      </Button>
                    </ButtonGroup>
                  </Dialog>
                )}
              </DialogTrigger>
            </Grid>
          </DisclosurePanel>
        </Disclosure>
        <Disclosure id="textcase">
          <DisclosureTitle>Text Options</DisclosureTitle>
          <DisclosurePanel>
            <Grid
              areas={["label field"]}
              alignItems={"center"}
              maxWidth={"size-4600"}
              gap={"size-100"}
            >
              <Checkbox isSelected={useTextCase} onChange={setUseTextCase}>
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
              <Checkbox isSelected={useLeading} onChange={setUseLeading}>
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
