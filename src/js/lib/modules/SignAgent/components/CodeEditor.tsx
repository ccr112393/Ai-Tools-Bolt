import CodeMirror from "@uiw/react-codemirror";
import { autocompletion, CompletionContext } from "@codemirror/autocomplete";
import { autocompleteKeywords, signagentLanguage } from "./CodeSignAgentLang";
import { spectrumHighlightStyle, spectrumTheme } from "./CodeEditorTheme";
import { syntaxHighlighting } from "@codemirror/language";
import { useTheme } from "../../../contexts";

interface CodeEditorProps {
  code?: string;
  setCode?: (value: string) => void;
}

function keywordCompltetion(context: CompletionContext) {
  const word = context.matchBefore(/\w*/);
  if (!word || (word.from === word.to && !context.explicit)) return null;
  return {
    from: word.from,
    options: autocompleteKeywords(),
  };
}

function CodeEditor({ code, setCode }: CodeEditorProps) {
  const handleChange = (value: string) => {
    if (setCode) setCode(value);
  };

  const themeSettings = useTheme();

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
      theme={themeSettings.colorScheme}
    />
  );
}

export default CodeEditor;
