import { Grid, TextField, Text } from "@adobe/react-spectrum";
import { UnitPicker, NumberFieldDefault } from "../../../components";
import { componentWidth } from "../../../utils";
import { useRegistration } from "../contexts/RegistrationContext";

export function RegistrationDisclosure() {
  const { registrationSettings, updateSettings } = useRegistration();
  return (
    <Grid
      areas={["label field"]}
      gap={"size-100"}
      alignItems={"center"}
      maxWidth={"size-4600"}
    >
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
        validationState={
          registrationSettings.layerName.length <= 0 ? "invalid" : undefined
        }
        errorMessage="Missing layer name"
        onChange={(key) => updateSettings("layerName", key)}
        width={componentWidth}
      />

      <Text>Diameter</Text>
      <NumberFieldDefault
        name="diameter"
        value={registrationSettings.diameter}
        minValue={0}
        validationState={
          registrationSettings.diameter <= 0 ||
          Number.isNaN(registrationSettings.diameter)
            ? "invalid"
            : undefined
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
    </Grid>
  );
}
