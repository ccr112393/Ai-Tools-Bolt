import {
  Disclosure,
  DisclosureTitle,
  StatusLight,
  ContextualHelp,
  Content,
  Well,
  DisclosurePanel,
  Grid,
  Checkbox,
  Picker,
  Item,
  Text,
} from "@adobe/react-spectrum";

import { componentGap, componentWidth } from "../../modules/util";

export interface JustificationDisclosureSettings {
  hasHorizontalJustify: boolean;
  hasVerticalJustify: boolean;
  horizontalJustify: string;
  verticalJustify: string;
}

export interface JustificationDisclosureProps {
  hasHorizontalJustify: boolean;
  setHasHorizontalJustify: (value: boolean) => void;
  hasVerticalJustify: boolean;
  setHasVerticalJustify: (value: boolean) => void;
  horizontalJustify: string;
  setHorizontalJustify: (value: string) => void;
  verticalJustify: string;
  setVerticalJustify: (value: string) => void;
}

export const JustificationDisclosure: React.FC<
  JustificationDisclosureProps
> = ({
  hasHorizontalJustify,
  setHasHorizontalJustify,
  hasVerticalJustify,
  setHasVerticalJustify,
  horizontalJustify,
  setHorizontalJustify,
  verticalJustify,
  setVerticalJustify,
}) => {
  return (
    <Disclosure id="justification">
      <DisclosureTitle>
        <Text flex>Justification</Text>
        <StatusLight
          isDisabled={!hasHorizontalJustify && !hasVerticalJustify}
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
            isSelected={hasVerticalJustify}
            onChange={setHasVerticalJustify}
          >
            Vertical
          </Checkbox>
          <Picker
            width={componentWidth}
            selectedKey={verticalJustify}
            onSelectionChange={(key) => setVerticalJustify(key as string)}
          >
            <Item key="top">Top</Item>
            <Item key="middle">Middle</Item>
            <Item key="bottom">Bottom</Item>
          </Picker>
        </Grid>
      </DisclosurePanel>
    </Disclosure>
  );
};
