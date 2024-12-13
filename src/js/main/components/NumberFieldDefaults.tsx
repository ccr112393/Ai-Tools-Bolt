import { NumberField, SpectrumNumberFieldProps } from "@adobe/react-spectrum";

interface NumberFieldDefaultProps
  extends Omit<SpectrumNumberFieldProps, "formatOptions"> {
  //   unit?: string;
}

function withNumberFieldDefaults(WrappedComponent: typeof NumberField) {
  return function NumberFieldDefault({ ...props }: NumberFieldDefaultProps) {
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
          style: "decimal",
          maximumFractionDigits: 4,
        }}
      />
    );
  };
}

export const NumberFieldDefault = withNumberFieldDefaults(NumberField);
