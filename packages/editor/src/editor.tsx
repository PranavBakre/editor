import {
  InitialConfigType,
  LexicalComposer,
} from "@lexical/react/LexicalComposer";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import { LexicalErrorBoundary } from "@lexical/react/LexicalErrorBoundary";
import { MarkdownShortcutPlugin } from "@lexical/react/LexicalMarkdownShortcutPlugin";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { EditorThemeClasses, LexicalEditor } from "lexical";
import { ReactElement, ReactNode, useMemo } from "react";
import { InternalNodes } from "./nodes/internal";

export interface EditorProps {
  children: ReactNode;
  onError: (error: Error, editor: LexicalEditor) => void;
  editable?: boolean;
  theme?: EditorThemeClasses;
  placeholder?: ((isEditable: boolean) => null | ReactElement) | null | ReactElement
}

export const Editor = ({
  children,
  onError,
  editable = true,
  theme,
  placeholder
}: EditorProps) => {
  const initialConfig = useMemo<InitialConfigType>(() => {
    return {
      namespace: "editor",
      editable,
      onError,
      theme,
      nodes: InternalNodes
    };
  }, [onError, editable]);

  return (
    <div className="editor">
      <LexicalComposer initialConfig={initialConfig}>
        <RichTextPlugin
          ErrorBoundary={LexicalErrorBoundary}
          contentEditable={<ContentEditable />}
          placeholder={placeholder}
        />
        <MarkdownShortcutPlugin />
      </LexicalComposer>
    </div>
  );
};
