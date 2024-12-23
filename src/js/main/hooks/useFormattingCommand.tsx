import { useState, useEffect } from "react";
import { UnitList } from "../modules/util";
import { SignAgentProfileSettings } from "../hooks";

export function useFormattingCommand(settings: SignAgentProfileSettings) {
  const [formattingCommand, setFormattingCommand] = useState("");

  const createFormattingCommand = (): string => {
    let cmd: string[] = [];
    if (settings.justification.hasHorizontal) {
      cmd.push(settings.justification.horizontal);
    }
    if (settings.justification.hasVertical) {
      cmd.push(settings.justification.vertical);
    }
    if (settings.color.hasColor) {
      cmd.push(`color: {${settings.color.color}}`);
    }
    if (settings.color.hasFillColor) {
      cmd.push(`fill_color: {${settings.color.fillColor}}`);
    }
    if (settings.color.hasStrokeColor) {
      cmd.push(`stroke_color: {${settings.color.strokeColor}}`);
    }
    if (settings.textOptions.hasTextCase) {
      cmd.push(settings.textOptions.textCase);
    }
    if (settings.textOptions.hasLeading) {
      let leadingUnitAbbr = UnitList.find(
        (unit) => unit.key == settings.textOptions.leadingUnit
      )?.abbr;
      cmd.push(
        `leading: ${settings.textOptions.leading.toString()} ${leadingUnitAbbr}`
      );
    }
    return cmd.join(", ");
  };

  useEffect(() => {
    setFormattingCommand(createFormattingCommand());
  }, [settings]);

  return formattingCommand;
}
