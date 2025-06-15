import {
  InitialConfigType,
  LexicalComposer,
} from "@lexical/react/LexicalComposer";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import { LexicalErrorBoundary } from "@lexical/react/LexicalErrorBoundary";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { EditorThemeClasses, LexicalEditor } from "lexical";
import { useMemo } from "react";

export interface EditorProps {
  children: React.ReactNode;
  onError: (error: Error, editor: LexicalEditor) => void;
  editable?: boolean;
  theme?: EditorThemeClasses;
}

export const Editor = ({
  children,
  onError,
  editable = true,
  theme,
}: EditorProps) => {
  const initialConfig = useMemo<InitialConfigType>(() => {
    return {
      namespace: "editor",
      editable,
      onError,
      theme,
    };
  }, [onError, editable]);

  return (
    <div className="editor">
      <LexicalComposer initialConfig={initialConfig}>
        <RichTextPlugin
          ErrorBoundary={LexicalErrorBoundary}
          contentEditable={<ContentEditable />}
        />
      </LexicalComposer>
    </div>
  );
};
