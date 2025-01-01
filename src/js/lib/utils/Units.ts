export type UnitItem = {
  key: string;
  abbr: string;
  name: string;
};

export const UnitList: UnitItem[] = [
  { key: "inch", abbr: "in", name: "Inches" },
  { key: "millimeter", abbr: "mm", name: "Millimeters" },
  { key: "centimeter", abbr: "cm", name: "Centimeters" },
  { key: "foot", abbr: "ft", name: "Feet" },
  { key: "meter", abbr: "m", name: "Meters" },
  { key: "pixel", abbr: "px", name: "Pixels" },
  { key: "point", abbr: "pt", name: "Points" },
];

export const getUnitAbbreviation = (key: string): string => {
  let leadingUnitAbbr = UnitList.find((unit) => unit.key == key)?.abbr;
  return leadingUnitAbbr ? leadingUnitAbbr : UnitList[0].abbr;
};

export const getUnitByAbbreviation = (abbr: string): UnitItem => {
  let foundUnit = UnitList.find((unit) => unit.abbr == abbr);
  return foundUnit ? foundUnit : UnitList[0];
};

// let leadingUnitAbbr = UnitList.find(
//   (unit) => unit.key == settings.textOptions.leadingUnit
// )?.abbr;
// cmd.push(
//   `leading: ${settings.textOptions.leading.toString()} ${leadingUnitAbbr}`
// );
