import { TextField, Text } from "@react-spectrum/s2";
import { style } from "@react-spectrum/s2/style" with { type: "macro" };
import { UnitPicker, NumberFieldDefault } from "../../../components";
import { componentWidth } from "../../../utils";
import { useRegistration } from "../contexts/RegistrationContext";
import { useMemo } from "react";

export function RegistrationDisclosure() {
  const { registrationSettings, updateSettings, invalidSettings } =
    useRegistration();

  const isInvalid = useMemo(() => {
    switch (true) {
      case registrationSettings.layerName == "":
      case Number.isNaN(registrationSettings.diameter):
        break;

      default:
        break;
    }
  }, [registrationSettings]);

  return (
    <div
      className={style({
        display: "grid",
        gridTemplateAreas: ["label field"],
        gap: 8,
        alignItems: "center",
        maxWidth: 368
      })}>
      <Text>Unit Type</Text>
      <UnitPicker
        selectedKey={registrationSettings.unit}
        onSelectionChange={(key) => updateSettings("unit", key)}
        maxWidth={componentWidth}
      />
      <Text>Layer Name</Text>
      <TextField
        name="layerName"
        value={registrationSettings.layerName}
        isInvalid
        errorMessage="Missing layer name"
        onChange={(key) => updateSettings("layerName", key)}
        styles={style({ width: 32 })}
      />
      <Text>Diameter</Text>
      <NumberFieldDefault
        name="diameter"
        value={registrationSettings.diameter}
        minValue={0}
        validationState={
          invalidSettings.includes("diameter") ? "invalid" : undefined
        }
        errorMessage="Diameter should be greater than zero"
        onChange={(key) => updateSettings("diameter", key)}
        width={componentWidth}
      />
      <Text>Edge Offset</Text>
      <NumberFieldDefault
        name="edgeOffset"
        value={registrationSettings.edgeOffset}
        onChange={(key) => updateSettings("edgeOffset", key)}
        width={componentWidth}
      />
    </div>
  );
}
