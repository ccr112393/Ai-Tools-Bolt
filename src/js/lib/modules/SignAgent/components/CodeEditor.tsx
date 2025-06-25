import React, { useState } from "react";
import CodeMirror, { lineNumbers } from "@uiw/react-codemirror";
import { autocompletion, CompletionContext } from "@codemirror/autocomplete";
import { signagentLanguage } from "./CodeSignAgentLang";
import { spectrumHighlightStyle, spectrumTheme } from "./CodeEditorTheme";
import { syntaxHighlighting } from "@codemirror/language";

interface CodeEditorProps {
  code?: string;
  setCode?: (value: string) => void;
}

const keywordSuggestions = [
  {
    label: "altb",
    apply: "align_top_to_bottom:",
    detail: "Expands to: align_top_to_bottom:",
  },
  { label: "alr", apply: "align_right:", detail: "Expands to: align_right:" },
  // Add more as needed
];

function keywordCompltetion(context: CompletionContext) {
  const word = context.matchBefore(/\w*/);
  if (!word || (word.from === word.to && !context.explicit)) return null;
  return {
    from: word.from,
    options: keywordSuggestions,
  };
}

function CodeEditor({ code, setCode }: CodeEditorProps) {
  const handleChange = (value: string) => {
    if (setCode) setCode(value);
  };

  return (
    <CodeMirror
      value={code}
      onChange={handleChange}
      height="120px"
      extensions={[
        signagentLanguage,
        spectrumTheme,
        syntaxHighlighting(spectrumHighlightStyle),
        autocompletion({ override: [keywordCompltetion] }),
      ]}
      theme="none"
    />
  );
}

export default CodeEditor;
