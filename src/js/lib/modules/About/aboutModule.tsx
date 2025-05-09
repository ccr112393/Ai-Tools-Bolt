import {
  Flex,
  Heading,
  Item,
  Picker,
  Radio,
  RadioGroup,
  Slider,
} from "@adobe/react-spectrum";
import { useAtom } from "jotai";
// import { appUIScaleAtom } from "../../../main/main";
import { componentWidth } from "../../utils";

export function AboutComponent() {
  // const [appUIScale, setAppUIScale] = useAtom(appUIScaleAtom);

  // const uiScaleOptions = [
  //   { id: "70%", name: "Smallest" },
  //   { id: "80%", name: "Small" },
  //   { id: "90%", name: "Default" },
  //   { id: "100%", name: "Large" },
  //   { id: "110%", name: "Largest" },
  // ];

  // const handleUIScaleChange = (value: string) => {
  //   setAppUIScale(value);
  //   document.body.style.zoom = appUIScale;
  //   window.location.reload();
  // };

  return (
    <Flex direction={"column"} alignSelf={"center"}>
      <Flex
        direction={"row"}
        alignItems={"center"}
        justifyContent={"space-between"}
      >
        <Heading level={2}>About Ai Tools</Heading>
      </Flex>
      {/* <Picker
        label="UI Scale"
        items={uiScaleOptions}
        selectedKey={appUIScale.toString()}
        onSelectionChange={(key) => handleUIScaleChange(key as string)}
      >
        {(item) => <Item key={item.id}>{item.name}</Item>}
      </Picker> */}
    </Flex>
  );
}
