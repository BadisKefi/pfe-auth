import { useState, useRef, useMemo, Dispatch, SetStateAction } from "react";
import JoditEditor, { IJoditEditorProps } from "jodit-react";
import HTMLReactParser from "html-react-parser";
import { useTheme } from "next-themes";

const Jodit = ({
  content = "start writing...",
  setContent,
}: {
  content: string;
  setContent: Dispatch<SetStateAction<string>>;
}) => {
  const { theme, systemTheme } = useTheme();

  const editor = useRef(null);
  const config: IJoditEditorProps["config"] = {
    // Add your Jodit editor configuration here
    // Example:
    readonly: false, // Make it editable
    height: "auto",
    theme: theme === "system" ? systemTheme : theme,
    // toolbarButtonSize: "middle",
    // buttons: ["bold", "italic", "|", "heading", "|", "foreColor"],
    // showTooltip: false,
    // toolbarAdaptive: false,
    // fullsize: true, // Disable adaptive toolbar

    // Set the height of the editor
    // Add more configuration options as needed
  };
  const handleUpdate = (newContent: string) => {
    setContent(newContent);
    console.log(newContent);
  };
  return (
    <div className="prose">
      <JoditEditor
        config={config}
        ref={editor}
        value={content}
        onBlur={handleUpdate}
      />

      {/* <div>{HTMLReactParser(content)}</div> */}
    </div>
  );
};

export default Jodit;
