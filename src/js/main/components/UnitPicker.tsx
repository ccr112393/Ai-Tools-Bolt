import { UnitList, UnitItem } from "../modules/util";
import { Picker, Item, SpectrumPickerProps } from "@adobe/react-spectrum";
import React from "react";

interface UnitPickerProps
  extends Omit<SpectrumPickerProps<UnitItem>, "children"> {
  // Add any additional props specific to UnitPicker here
}

const UnitPicker: React.FC<UnitPickerProps> = (props) => {
  return (
    <Picker width="75px" defaultSelectedKey="in" items={UnitList} {...props}>
      {(item) => <Item key={item.key}>{item.key}</Item>}
    </Picker>
  );
};

export default UnitPicker;
