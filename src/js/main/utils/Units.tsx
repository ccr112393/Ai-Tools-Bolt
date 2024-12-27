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
