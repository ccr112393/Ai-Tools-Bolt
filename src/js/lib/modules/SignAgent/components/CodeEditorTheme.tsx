import { EditorView } from "@codemirror/view";
import { HighlightStyle } from "@codemirror/language";
import { tags } from "@lezer/highlight";

export const spectrumTheme = EditorView.theme({
  "&": {
    backgroundColor: "var(--spectrum-global-color-gray-50) !important",
    border: "1px solid var(--spectrum-alias-border-color) !important",
    borderRadius: "var(--spectrum-alias-border-radius-regular) !important",
    padding: "8px !important",
  },
  ".cm-content": {
    fontFamily: "var(--spectrum-alias-body-text-font-family)",
    fontSize: "14px",
    color: "var(--spectrum-alias-text-color)",
    // caretColor: "var(--spectrum-alias-text-color)",
  },
  ".cm-gutters": {
    display: "none",
    backgroundColor: "var(--spectrum-global-color-gray-75)",
    borderRight: "1px solid var(--spectrum-alias-border-color)",
  },
  "&.cm-focused": {
    outline: "none",
    border: "1px solid var(--spectrum-alias-focus-ring-color)",
    boxShadow: "0 0 0 1px var(--spectrum-alias-focus-ring-color)",
  },
  ".cm-activeLine": {
    background: "transparent !important;",
  },
});

export const spectrumHighlightStyle = HighlightStyle.define([
  { tag: tags.keyword, color: "var(--spectrum-global-color-blue-500)" },
  { tag: tags.unit, color: "var(--spectrum-global-color-orange-500)" },
  { tag: tags.number, color: "var(--spectrum-global-color-green-500)" },
  { tag: tags.punctuation, color: "var(--spectrum-global-color-gray-500)" },
]);
