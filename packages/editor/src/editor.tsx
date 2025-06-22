import {
  type InitialConfigType,
  type InitialEditorStateType,
  LexicalComposer,
} from "@lexical/react/LexicalComposer";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import { OnChangePlugin } from "@lexical/react/LexicalOnChangePlugin";
import { LexicalErrorBoundary } from "@lexical/react/LexicalErrorBoundary";
import { MarkdownShortcutPlugin } from "@lexical/react/LexicalMarkdownShortcutPlugin";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { type EditorState, type EditorThemeClasses, type LexicalEditor } from "lexical";
import { type ReactElement, type ReactNode, useMemo } from "react";
import { InternalNodes } from "./nodes/internal";
import { CollaborationPlugin } from "./features/collaboration";
import {
  type FeatureContextType,
  FeatureProvider,
} from "./features/setup";

export interface EditorProps {
  initialState?: InitialEditorStateType;
  children?: ReactNode;
  onError: (error: Error, editor: LexicalEditor) => void;
  onChange?: (editorState: EditorState) => void;
  editable?: boolean;
  theme?: EditorThemeClasses;
  placeholder?:
    | ((isEditable: boolean) => null | ReactElement)
    | null
    | ReactElement;
  features?: FeatureContextType;
}

export const Editor = ({
  initialState,
  onError,
  onChange,
  editable = true,
  theme,
  placeholder,
  features = {},
}: EditorProps) => {
  const initialConfig = useMemo<InitialConfigType>(() => {
    return {
      namespace: "editor",
      editable,
      onError,
      theme,
      nodes: InternalNodes,
      editorState: null
    };
  }, [onError, editable]);

  return (
    <FeatureProvider value={features}>
      <div className="editor">
        <LexicalComposer initialConfig={initialConfig}>
          <RichTextPlugin
            ErrorBoundary={LexicalErrorBoundary}
            contentEditable={<ContentEditable />}
            placeholder={(editable) => {
              if (editable) {
                return (
                  <div className="paragraph placeholder">
                    {typeof placeholder === "function"
                      ? placeholder(editable)
                      : placeholder}
                  </div>
                );
              }
              return null;
            }}
          />
          <MarkdownShortcutPlugin />
          <CollaborationPlugin initialState={initialState}/>
          {onChange && <OnChangePlugin onChange={onChange} />}
        </LexicalComposer>
      </div>
    </FeatureProvider>
  );
};
