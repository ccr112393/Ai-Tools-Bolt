import { PickerItem, Picker } from "@react-spectrum/s2";
import { SpectrumPickerProps } from "@adobe/react-spectrum";
import React from "react";
import { UnitItem, UnitList } from "../utils/Units";

interface UnitPickerProps
  extends Omit<SpectrumPickerProps<UnitItem>, "children"> {
  // Add any additional props specific to UnitPicker here
  abbreviate?: boolean;
}

export const UnitPicker: React.FC<UnitPickerProps> = (props) => {
  return (
    <Picker defaultValue="inch" items={UnitList}
    >
      {(item) => (
        <PickerItem id={item.key}>{props.abbreviate ? item.abbr : item.name}</PickerItem>
      )}
    </Picker>
  );
};
