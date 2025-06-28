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
import {
  type EditorState,
  type EditorThemeClasses,
  type LexicalEditor,
} from "lexical";
import { type ReactElement, type ReactNode, useMemo, useState } from "react";
import { InternalNodes } from "./nodes/internal";
import { CollaborationPlugin } from "./features/collaboration";
import { type FeatureContextType, FeatureProvider } from "./features/setup";
import { type ColorScheme, ColorSchemeProvider } from "./theme/provider";
import MarkdownPlugin from "./plugins/markdown-shortcuts";
import { TextFormattingToolbarPlugin } from "./plugins/text-formatting-toolbar";

export interface EditorProps {
  initialState?: InitialEditorStateType;
  children?: ReactNode;
  onError: (error: Error, editor: LexicalEditor) => void;
  onChange?: (editorState: EditorState) => void;
  editable?: boolean;
  editorClasses?: EditorThemeClasses;
  colorScheme?: ColorScheme;
  placeholder?:
    | ((isEditable: boolean) => null | ReactElement)
    | null
    | ReactElement;
  features?: FeatureContextType;
  className?: string;
}

export const Editor = ({
  initialState,
  onError,
  onChange,
  editable = true,
  editorClasses: theme,
  placeholder,
  className,
  features = {},
  colorScheme = "theme-sepia-light",
}: EditorProps) => {
  const initialConfig = useMemo<InitialConfigType>(() => {
    return {
      namespace: "editor",
      editable,
      onError,
      theme,
      nodes: InternalNodes,
      editorState: null,
    };
  }, [onError, editable]);

  const [container, setContainer] = useState<HTMLDivElement | null>(null);

  const onRef = (_container: HTMLDivElement) => {
    if (_container !== null) {
      setContainer(_container);
    }
  };

  return (
    <ColorSchemeProvider colorScheme={colorScheme}>
      <FeatureProvider value={features}>
        <div className={`editor theme-base ${colorScheme} ${className ?? ""}`} ref={onRef}>
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
            <CollaborationPlugin initialState={initialState} />
            {onChange && <OnChangePlugin onChange={onChange} />}
            <MarkdownPlugin />
            <TextFormattingToolbarPlugin anchor={container} />
          </LexicalComposer>
        </div>
      </FeatureProvider>
    </ColorSchemeProvider>
  );
};
