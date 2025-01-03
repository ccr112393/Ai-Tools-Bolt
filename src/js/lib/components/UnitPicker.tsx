import { Item, Picker, SpectrumPickerProps } from "@adobe/react-spectrum";
import React from "react";
import { UnitItem, UnitList } from "../utils/Units";

interface UnitPickerProps
  extends Omit<SpectrumPickerProps<UnitItem>, "children"> {
  // Add any additional props specific to UnitPicker here
  abbreviate?: boolean;
}

export const UnitPicker: React.FC<UnitPickerProps> = (props) => {
  return (
    <Picker defaultSelectedKey="inch" items={UnitList} {...props}>
      {(item) => (
        <Item key={item.key}>{props.abbreviate ? item.abbr : item.name}</Item>
      )}
    </Picker>
  );
};
