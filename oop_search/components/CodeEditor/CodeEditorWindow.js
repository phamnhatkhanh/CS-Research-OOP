"use client";
import { useState } from "react";

import Editor from "@monaco-editor/react";

const CodeEditorWindow = ({ onChange, language, code, theme }) => {
  const [value, setValue] = useState(code || "");
  const handleEditorChange = (value) => {
    setValue(value);
    onChange("code", value);
  };

  return (
    <Editor
      height="80vh"
      width={`100%`}
      language={language || "c"}
      value={value}
      theme={theme}
      defaultValue="// some comment"
      onChange={handleEditorChange}
    />
  );
};
export default CodeEditorWindow;
