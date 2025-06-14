import { useState } from "react";
import Editor from "react-simple-code-editor";
import Prism from "prismjs";
import "prismjs/themes/prism.css";
import { lightTheme, Text, useProvider } from "@adobe/react-spectrum";

interface LiveEditorProps {
  code: string;
  setCode: (code: string) => void;
}

const codeKeywordHexColors = {
  dark: {
    keyword: "#54a3f6",
    unit: "#e46f00",
    number: "#12a26c",
    punctuation: "#b2b2b2",
  },
  light: {
    keyword: "#0054b6",
    unit: "#cb5d00",
    number: "#007a4d",
    punctuation: "#6d6d6d",
  },
};

function PrismStyle() {
  const { theme } = useProvider();

  return (
    <>
      <style>
        {`
        #root .token.keyword {
          color: ${
            theme === lightTheme
              ? codeKeywordHexColors.light.keyword
              : codeKeywordHexColors.dark.keyword
          } !important;
        }
        #root .token.unit {
          color: ${
            theme === lightTheme
              ? codeKeywordHexColors.light.unit
              : codeKeywordHexColors.dark.unit
          } !important;
        }
        #root .token.number {
          color: ${
            theme === lightTheme
              ? codeKeywordHexColors.light.number
              : codeKeywordHexColors.dark.number
          } !important;
        }
        #root .token.punctuation {
          color: ${
            theme === lightTheme
              ? codeKeywordHexColors.light.punctuation
              : codeKeywordHexColors.dark.punctuation
          } !important;
        }
      `}
      </style>
    </>
  );
}

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

const keywordPattern = new RegExp(`\\b(${keywords.join("|")})\\b`, "g");
const unitPattern = new RegExp(`\\b(${units.join("|")})\\b`, "g");
const numberPattern = /\b\d+(\.\d+)?\b/g;
const punctuationPattern = /[,:]/g;

// Register your custom language (optional, for more advanced highlighting)
Prism.languages.signagent = {
  punctuation: punctuationPattern,
  keyword: keywordPattern,
  unit: unitPattern,
  number: numberPattern,
};

function highlight(code: string) {
  // Use Prism to highlight, or roll your own if preferred
  return Prism.highlight(code, Prism.languages.signagent, "signagent");
}

export default function LiveEditor({ code, setCode }: LiveEditorProps) {
  return (
    <>
      <PrismStyle />
      <Editor
        value={code}
        onValueChange={setCode}
        highlight={highlight}
        padding={10}
        style={{
          minHeight: 100,
        }}
      />
    </>
  );
}
