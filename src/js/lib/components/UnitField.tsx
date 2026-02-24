import { SpectrumNumberFieldProps } from "@adobe/react-spectrum";

import { NumberField } from "@react-spectrum/s2";

interface UnitFieldProps
  extends Omit<SpectrumNumberFieldProps, "formatOptions"> {
  unit?: string;
}

function withUnitFieldDefaults(WrappedComponent: typeof NumberField) {
  return function UnitField({ unit = "inch", ...props }: UnitFieldProps) {
    const defaultProps: Partial<SpectrumNumberFieldProps> = {
      defaultValue: 3,
      hideStepper: true,
      //step: 0.125,
    };

    return (
      <WrappedComponent
        {...defaultProps}
        {...props}
        formatOptions={{
          style: "unit",
          unit,
          maximumFractionDigits: 4,
        }}
      />
    );
  };
}

export const UnitField = withUnitFieldDefaults(NumberField);
