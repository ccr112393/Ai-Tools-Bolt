import { ActionButton, Content, Heading } from "@react-spectrum/s2";
import { style } from "@react-spectrum/s2/style" with { type: "macro" };
import { componentGap, componentGapDouble } from "../../../utils";
import ChevronLeft from "@react-spectrum/s2/icons/ChevronLeft";
import { useTabContext } from "../../SignAgent";

export const NewView = () => {
  const { setSelectedTab } = useTabContext();
  return (
    <div
      className={style({ padding: 2 })}>
      <div
        className={style({
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          gap: 2,
        })}>
        <ActionButton isQuiet onPress={() => setSelectedTab("rename")}>
          <ChevronLeft />
        </ActionButton>
        <Heading level={3}>New View</Heading>
      </div>
      <Content>Content</Content>
    </div>
  );
};
