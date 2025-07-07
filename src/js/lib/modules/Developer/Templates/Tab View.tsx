import {
  ActionButton,
  Content,
  Flex,
  Heading,
  View,
} from "@adobe/react-spectrum";
import { componentGap, componentGapDouble } from "../../../utils";
import ChevronLeft from "@spectrum-icons/workflow/ChevronLeft";
import { useTabContext } from "../../SignAgent";

export const NewView = () => {
  const { setSelectedTab } = useTabContext();
  return (
    <View marginTop={componentGapDouble}>
      <Flex direction={"row"} gap={componentGap} alignItems={"center"}>
        <ActionButton isQuiet onPress={() => setSelectedTab("rename")}>
          <ChevronLeft />
        </ActionButton>
        <Heading level={3}>New View</Heading>
      </Flex>
      <Content>Content</Content>
    </View>
  );
};
