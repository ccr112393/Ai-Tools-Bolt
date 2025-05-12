import { useEffect, useState } from "react";
import { newProfileSettings, ProfileSettings } from "../..";
import { getUnitAbbreviation, getUnitByAbbreviation } from "../../../utils";

export function formatFieldName(fieldName: string): string {
  return fieldName
    .toLowerCase()
    .replace(/\s+/g, "_")
    .replace(/[^a-zA-Z0-9_]/g, "");
}

export function useFormattingCommand(settings: ProfileSettings) {
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
      let leadingUnitAbbr = getUnitAbbreviation(
        settings.textOptions.leadingUnit
      );
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

export async function readFormattingCommand(
  pathItemName: string
): Promise<ProfileSettings> {
  let cmds = [""];
  let newSettings: ProfileSettings = newProfileSettings();
  console.log("Start Read:", pathItemName);
  try {
    cmds = pathItemName
      .replaceAll(" ", "")
      .replaceAll("{", "")
      .replaceAll("}", "")
      .split(",");

    cmds.forEach((cmd) => {
      switch (true) {
        case cmd == "left":
        case cmd == "right":
        case cmd == "center":
          newSettings.justification = {
            ...newSettings.justification,
            hasHorizontal: true,
            horizontal: cmd,
          };
          break;

        case cmd == "top":
        case cmd == "bottom":
        case cmd == "middle":
          newSettings.justification = {
            ...newSettings.justification,
            hasVertical: true,
            vertical: cmd,
          };
          break;

        case cmd.startsWith("color:"):
          newSettings.color = {
            ...newSettings.color,
            hasColor: true,
            color: cmd.replace("color:", ""),
          };
          break;

        case cmd.startsWith("fill_color:"):
          newSettings.color = {
            ...newSettings.color,
            hasFillColor: true,
            fillColor: cmd.replace("fill_color:", ""),
          };
          break;

        case cmd.startsWith("stroke_color:"):
          newSettings.color = {
            ...newSettings.color,
            hasStrokeColor: true,
            strokeColor: cmd.replace("stroke_color:", ""),
          };
          break;

        case cmd == "uppercase":
        case cmd == "lowercase":
        case cmd == "titlecase":
          newSettings.textOptions = {
            ...newSettings.textOptions,
            hasTextCase: true,
            textCase: cmd,
          };
          break;

        case cmd.startsWith("leading:"):
          let foundLeadingUnit = getUnitByAbbreviation(
            cmd.match(/[a-z]+$/i)?.[0] ?? ""
          );
          newSettings.textOptions = {
            ...newSettings.textOptions,
            hasLeading: true,
            leading: parseFloat(cmd.match(/\d+(\.\d+)?/)?.[0] ?? "0"),
            leadingUnit: foundLeadingUnit.key,
          };
          break;

        default:
          break;
      }
    });
  } catch (error) {
    error instanceof Error ? console.log(error.message) : console.log(error);
  }
  console.log("Done Reading:", cmds);
  return newSettings;
}
