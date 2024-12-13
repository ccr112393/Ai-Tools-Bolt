import {
  Accordion,
  Checkbox,
  Content,
  ContextualHelp,
  Disclosure,
  DisclosurePanel,
  DisclosureTitle,
  Flex,
  Heading,
  Link,
  Picker,
  Text,
  Item,
  Grid,
  DialogTrigger,
  Divider,
  ActionButton,
  Dialog,
  ButtonGroup,
  Button,
} from "@adobe/react-spectrum";
import { useState } from "react";

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
              href="https://signagent.com"
              target="_blank"
              rel="noopener noreferrer"
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
  const componentWidth = "size-1700";
  const [useHorizontalJustify, setUseHorizontalJustify] = useState(true);
  const [useVerticallJustify, setUseVerticalJustify] = useState(true);
  const [horizontalJustify, setHorizontalJustify] = useState("left");
  const [verticallJustify, setVerticalJustify] = useState("top");
  const [useColor, setUseColor] = useState(true);
  const [useFillColor, setUseFillColor] = useState(false);
  const [useStrokeColor, setUseStrokeColor] = useState(false);
  const [color, setColor] = useState("color");
  const [fillColor, setFillColor] = useState("color");
  const [strokeColor, setStrokeColor] = useState("color");

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
              <Checkbox isSelected={useHorizontalJustify}>Horizontal</Checkbox>
              <Picker
                width={componentWidth}
                selectedKey={horizontalJustify}
                onSelectionChange={(key) => setHorizontalJustify(key as string)}
              >
                <Item key="left">Left</Item>
                <Item key="center">Center</Item>
                <Item key="right">Right</Item>
              </Picker>

              <Checkbox isSelected={useVerticallJustify}>Vertical</Checkbox>
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
              <Checkbox isSelected={useColor}>Color</Checkbox>
              <Picker
                width={componentWidth}
                selectedKey={color}
                onSelectionChange={(key) => setColor(key as string)}
              >
                <Item key="color">Color</Item>
              </Picker>

              <Checkbox isSelected={useFillColor}>Fill Color</Checkbox>
              <Picker
                width={componentWidth}
                selectedKey={fillColor}
                onSelectionChange={(key) => setFillColor(key as string)}
              >
                <Item key="color">Color</Item>
              </Picker>

              <Checkbox isSelected={useStrokeColor}>Stroke Color</Checkbox>
              <Picker
                width={componentWidth}
                selectedKey={strokeColor}
                onSelectionChange={(key) => setStrokeColor(key as string)}
              >
                <Item key="color">Color</Item>
              </Picker>
              <DialogTrigger>
                <ActionButton>Edit Colors</ActionButton>
                {(closeDialog) => (
                  <Dialog>
                    <Heading>Edit Colors</Heading>
                    <Divider />
                    <Content>
                      <Text>Testing</Text>
                      <ButtonGroup>
                        <Button variant="primary" onPress={closeDialog}>
                          Save
                        </Button>
                      </ButtonGroup>
                    </Content>
                  </Dialog>
                )}
              </DialogTrigger>
            </Grid>
          </DisclosurePanel>
        </Disclosure>
      </Accordion>
    </Flex>
  );
}
