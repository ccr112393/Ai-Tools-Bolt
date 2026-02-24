import { Color } from "@adobe/react-spectrum";
import { Button, Heading, parseColor, Text, TextField } from "@react-spectrum/s2";
import { style } from "@react-spectrum/s2/style" with { type: "macro" };
import { useState } from "react";
import { componentWidth125Percent, evalTS, postToast } from "../../utils";
import "./CustomFieldLabel.css";
import { RGBColorPicker } from "./RGBColorPicker";

type LaserLayerProperties = {
  regLayerName: string;
  lasLayerName: string;
  engLayerName: string;
  regColor: { r: number; g: number; b: number };
  lasColor: { r: number; g: number; b: number };
  engColor: { r: number; g: number; b: number };
};

function toRGBChannels(color: Color) {
  return {
    r: color.getChannelValue("red"),
    g: color.getChannelValue("green"),
    b: color.getChannelValue("blue"),
  };
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

  const properties: LaserLayerProperties = {
    regLayerName,
    lasLayerName,
    engLayerName,
    regColor: toRGBChannels(regColor),
    lasColor: toRGBChannels(lasColor),
    engColor: toRGBChannels(engColor),
  };

  const result = await evalTS("processLaserLayerProperties", properties);

  const processed: string[] = [];
  if (result.regFound) processed.push("Registration");
  if (result.lasFound) processed.push("Laser");
  if (result.engFound) processed.push("Engrave");

  if (processed.length === 2) {
    toast = `${processed[0]} and ${processed[1]}`;
  } else {
    toast = processed.join(", ");
  }

  console.log("RESULT: ", result);
  console.log("PROCESSED: ", processed);

  return toast;
}


export function LaserComponent() {

  const [registrationLayerName, setRegistrationLayerName] = useState("Registration");
  const [laserLayerName, setLaserLayerName] = useState("Laser");
  const [engraveLayerName, setEngraveLayerName] = useState("Engrave");

  const [registrationColor, setRegistrationColor] = useState(parseColor('rgb(0, 0, 0)'));
  const [laserColor, setLaserColor] = useState(parseColor('rgb(255, 0, 0)'));
  const [engraveColor, setEngraveColor] = useState(parseColor('rgb(0, 255, 0)'));

  const getColorNameOrValue = (color: Color): string => {
    let colorValue = color.toString("rgb").toUpperCase();
    let colorName = "";

    let colorVals = [color.getChannelValue("red"), color.getChannelValue("green"), color.getChannelValue("blue")]

    switch (colorVals.join(",")) {
      case "0,0,0":
        colorName = "RGB Black"
        break;
      case "255,0,0":
        colorName = "RGB Red"
        break;
      case "0,255,0":
        colorName = "RGB Green"
        break;
      case "0,0,255":
        colorName = "RGB Blue"
        break;
      case "255,255,255":
        colorName = "RGB White"
        break;
      default:
        break;
    }
    return (colorName.length > 0 ? colorName : colorValue);
  };

  return (
    <div
      className={style({
        display: "flex",
        flexDirection: "column",
        alignSelf: "center"
      })}>
      <div
        className={style({
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between"
        })}>
        <Heading level={2}>Laser Files</Heading>

      </div>
      <Text styles={style({
        marginBottom: 8
      })}>
        Quickly process laser cut files by converting the color space to RGB and setting registration fill, laser stroke, and engrave stroke colors.
      </Text>
      <div
        className={style({
          display: "grid",
          gridTemplateAreas: ["layer color values"],
          alignItems: "baseline",
          justifyContent: "start",
          maxWidth: 368,
          rowGap: 8,
          columnGap: 16
        })}>

        <Heading level={4} styles={style({
          marginBottom: 0
        })}>Layer Name</Heading>
        <Heading level={4} styles={style({
          marginBottom: 0
        })}>Color</Heading>
        <span></span>

        <TextField label="Registration" value={registrationLayerName} onChange={setRegistrationLayerName}
          styles={style({ width: 16 })} />
        <RGBColorPicker label="Fill" colorValue={registrationColor} setColorValue={setRegistrationColor} />
        <Text
          styles={style({
            alignSelf: "center",
            marginTop: 24
          })}>{getColorNameOrValue(registrationColor)}</Text>


        <TextField label="Laser" value={laserLayerName} onChange={setLaserLayerName}
          styles={style({ width: 16 })} />
        <RGBColorPicker label="Stroke" colorValue={laserColor} setColorValue={setLaserColor} />
        <Text
          styles={style({
            alignSelf: "center",
            marginTop: 24
          })}>{getColorNameOrValue(laserColor)}</Text>


        <TextField label="Engrave" value={engraveLayerName} onChange={setEngraveLayerName}
          styles={style({ width: 16 })} />
        <RGBColorPicker label="Stroke" colorValue={engraveColor} setColorValue={setEngraveColor} />
        <Text
          styles={style({
            alignSelf: "center",
            marginTop: 24
          })}>{getColorNameOrValue(engraveColor)}</Text>

      </div>
      <div
        className={style({
          display: "flex",
          justifyContent: "end",
          marginTop: 16
        })}>
        <Button
          variant="accent"
          onPress={() => {
            handleApply(registrationLayerName, laserLayerName, engraveLayerName, registrationColor, laserColor, engraveColor).then(
              (result) => {
                postToast(result.length > 0 ? 'positive' : 'negative', result.length > 0 ? `Applied to ${result}` : "Layers not found")
              }
            )

          }}
        >Apply</Button>
      </div>
    </div>
  );
}
