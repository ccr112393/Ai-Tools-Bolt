import {
  Button,
  Color,
  ColorField,
  ColorPicker,
  ColorSlider,
  Flex,
  Grid,
  Heading,
  parseColor,
  Text,
  TextField
} from "@adobe/react-spectrum";
import { useState } from "react";
import { componentWidth125Percent, evalTS, postToast } from "../../utils";
import "./CustomFieldLabel.css";



interface RGBColorPickerProps {
  label?: string;
  colorValue: Color;
  setColorValue: (color: Color) => void;
}

function RGBColorPicker({ label, colorValue, setColorValue }: RGBColorPickerProps) {
  const space = "rgb";


  return (
    <Flex direction={"column"} >

      {label && (
        <label className="customFieldLabel">{label}</label>
      )}
      <ColorPicker value={colorValue} >
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
): Promise<string> {
  let toast = "";

  await evalTS("processLaserLayerProperties", regLayerName, regColor, lasLayerName, lasColor, engLayerName, engColor).then((result) => {
    let processed = []
    result.regFound ? processed.push("Registration") : null;
    result.lasFound ? processed.push("Laser") : null;
    result.engFound ? processed.push("Engrave") : null;
    toast = `${processed.join(", ")}`
    console.log("RESULT: ", result);
    console.log("PROCESSED: ", processed);
  });

  return toast;
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
        areas={["layer color"]}
        alignItems={"baseline"}
        justifyContent={"start"}
        maxWidth={"size-4600"}
        rowGap={"size-100"}
        columnGap={"size-200"}>

        <Heading level={4} marginBottom={"size-0"}>Layer Name</Heading>
        <Heading level={4} marginBottom={"size-0"}>Color</Heading>

        <TextField label="Registration" value={registrationLayerName} onChange={setRegistrationLayerName} width={componentWidth125Percent} />
        <RGBColorPicker label="Fill" colorValue={registrationColor} setColorValue={setRegistrationColor} />


        <TextField label="Laser" value={laserLayerName} onChange={setLaserLayerName} width={componentWidth125Percent} />
        <RGBColorPicker label="Stroke" colorValue={laserColor} setColorValue={setLaserColor} />

        <TextField label="Engrave" value={engraveLayerName} onChange={setEngraveLayerName} width={componentWidth125Percent} />
        <RGBColorPicker label="Stroke" colorValue={engraveColor} setColorValue={setEngraveColor} />
      </Grid>

      <Flex justifyContent={"end"} marginTop={"size-200"}>
        <Button
          variant="accent"
          onPress={() => {
            handleApply(registrationLayerName, laserLayerName, engraveLayerName, registrationColor, laserColor, engraveColor).then(
              (result) => {
                postToast(result.length > 0 ? 'positive' : 'negative', result.length > 0 ? `Processed: ${result}` : "Layers not found")
              }
            )

          }}
        >Apply</Button>
      </Flex>

    </Flex>
  );
}
