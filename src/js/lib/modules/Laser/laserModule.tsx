import {
  Button,
  Color,
  ColorEditor,
  ColorField,
  ColorPicker,
  ColorSlider,
  Disclosure,
  DisclosurePanel,
  DisclosureTitle,
  Flex,
  Form,
  getColorChannels,
  Grid,
  Heading,
  parseColor,
  TextField,
  Text,
} from "@adobe/react-spectrum";
import { UnitField } from "../../components";
import { useState } from "react";
import { color } from "@uiw/react-codemirror";
import "./CustomFieldLabel.css";
import { componentWidth } from "../../utils";
import { cep } from "vite-cep-plugin";



interface RGBColorPickerProps {
  label?: string;
  colorValue: Color;
  setColorValue: (color: Color) => void;
}

function RGBColorPicker({ label, colorValue, setColorValue }: RGBColorPickerProps) {
  const space = "rgb";


  return (
    <Flex direction={"column"} >

      {/* {label && (
        <label className="customFieldLabel">{label}</label>
      )} */}
      <ColorPicker value={colorValue} label={colorValue.toString().slice(5, -4)}>
        <Flex direction={"column"} justifyContent={"space-between"} gap={"size-100"}>
          <ColorSlider key={"red"} channel={"red"} colorSpace={space} value={colorValue} onChange={setColorValue} />
          <ColorSlider key={"green"} channel={"green"} colorSpace={space} value={colorValue} onChange={setColorValue} />
          <ColorSlider key={"blue"} channel={"blue"} colorSpace={space} value={colorValue} onChange={setColorValue} />
          <Flex direction={"row"} justifyContent={"space-between"} width={"size-2400"} gap={"size-100"}>
            <ColorField label="Red" channel="red" colorSpace={space} value={colorValue} onChange={(color) => color && setColorValue(color)} />
            <ColorField label="Green" channel="green" colorSpace={space} value={colorValue} onChange={(color) => color && setColorValue(color)} />
            <ColorField label="Blue" channel="blue" colorSpace={space} value={colorValue} onChange={(color) => color && setColorValue(color)} />
          </Flex>
        </Flex>
      </ColorPicker>
    </Flex>
  );

}

async function handleApply(
  regLayerName: string,
  lasLayerName: string,
  engLayerName: string,
  regColor: Color,
  lasColor: Color,
  engColor: Color,
) {

}

export function LaserComponent() {

  const [registrationLayerName, setRegistrationLayerName] = useState("Registration");
  const [laserLayerName, setLaserLayerName] = useState("Laser");
  const [engraveLayerName, setEngraveLayerName] = useState("Engrave");

  const [registrationColor, setRegistrationColor] = useState(parseColor('rgb(0, 0, 0)'));
  const [laserColor, setLaserColor] = useState(parseColor('rgb(255, 0, 0)'));
  const [engraveColor, setEngraveColor] = useState(parseColor('rgb(0, 255, 0)'));

  return (
    <Flex direction={"column"} alignSelf={"center"}>
      <Flex
        direction={"row"}
        alignItems={"center"}
        justifyContent={"space-between"}
      >
        <Heading level={2}>Laser Files</Heading>

      </Flex>
      <Text marginBottom={"size-100"}>
        Quickly process laser cut files by converting the color space to RGB and setting registration fill, laser stroke, and engrave stroke colors.
      </Text>
      <Grid
        areas={["label layer color"]}
        alignItems={"center"}
        justifyContent={"start"}
        maxWidth={"size-4600"}
        rowGap={"size-100"}
        columnGap={"size-200"}>

        <Heading level={4} marginBottom={"size-0"}>Layer Type</Heading>
        <Heading level={4} marginBottom={"size-0"}>Layer Name</Heading>
        <Heading level={4} marginBottom={"size-0"}>Color</Heading>

        <Text>Registration</Text>
        <TextField value={registrationLayerName} onChange={setRegistrationLayerName} width={componentWidth}></TextField>
        <RGBColorPicker label="Fill" colorValue={registrationColor} setColorValue={setRegistrationColor} />

        <Text>Laser</Text>
        <TextField value={laserLayerName} onChange={setLaserLayerName} width={componentWidth}></TextField>
        <RGBColorPicker label="Stroke" colorValue={laserColor} setColorValue={setLaserColor} />

        <Text>Engrave</Text>
        <TextField value={engraveLayerName} onChange={setEngraveLayerName} width={componentWidth}></TextField>
        <RGBColorPicker label="Stroke" colorValue={engraveColor} setColorValue={setEngraveColor} />

      </Grid>

      <Flex justifyContent={"end"} marginTop={"size-200"}>
        <Button
          variant="accent">Apply</Button>
      </Flex>

    </Flex>
  );
}
