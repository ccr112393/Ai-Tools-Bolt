import { StreamLanguage, StringStream } from "@codemirror/language";
import type { Completion } from "@codemirror/autocomplete";

const keywords = [
  "left",
  "center",
  "right",
  "top",
  "middle",
  "bottom",
  "align_left",
  "align_center",
  "align_right",
  "align_top",
  "align_middle",
  "align_bottom",
  "align_left_to_right",
  "align_left_to_center",
  "align_center_to_left",
  "align_center_to_right",
  "align_right_to_left",
  "align_right_to_center",
  "align_top_to_bottom",
  "align_top_to_middle",
  "align_middle_to_top",
  "align_middle_to_bottom",
  "align_bottom_to_top",
  "align_bottom_to_middle",
  "align_bottom_to_bottom",
  "fill_color",
  "stroke_color",
  "tab_left",
  "tab_right",
  "tab_center",
  "indent_first",
  "indent_hanging",
  "uppercase",
  "lowercase",
  "titlecase",
  "lining-nums",
  "slashed-zero",
  "oldstyle-nums",
  "proportional-nums",
  "tabular-nums",
  "diagonal-fractions",
  "stacked-fractions",
  "leading",
  "side",
  "column",
  "repeat",
  "option",
];
const units = [
  "millimeters",
  "centimeters",
  "feet",
  "meters",
  "pixels",
  "points",
  "inches",
  "in",
  "mm",
  "cm",
  "ft",
  "m",
  "px",
  "pt",
];

export const autocompleteKeywords = (): Completion[] =>
  keywords.map((term) => ({
    label: term,
    // type: "keyword",
  }));

export const signagentLanguage = StreamLanguage.define({
  token: (stream: StringStream) => {
    // Define token patterns (same as your Prism setup)
    const keywordPattern = new RegExp(`\\b(${keywords.join("|")})\\b`);
    const unitPattern = new RegExp(`\\b(${units.join("|")})\\b`);
    const numberPattern = /\b\d+(\.\d+)?\b/;
    const punctuationPattern = /[,:]/;

    if (stream.match(keywordPattern)) return "keyword";
    if (stream.match(unitPattern)) return "unit";
    if (stream.match(numberPattern)) return "number";
    if (stream.match(punctuationPattern)) return "punctuation";

    stream.next();
    return null;
  },
});
