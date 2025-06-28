import { createHeadlessEditor as createHeadlessEditorImpl } from "@lexical/headless";
import {
  EditorState,
  KlassConstructor,
  LexicalNode,
  LexicalNodeReplacement,
} from "lexical";

export function createHeadlessEditor({
  onError,
  editable = true,
  editorState,
  nodes,
}: {
  onError: (error: Error) => void;
  editable?: boolean;
  editorState?: EditorState;
  nodes: readonly (
    | KlassConstructor<typeof LexicalNode>
    | LexicalNodeReplacement
  )[];
}) {
  return createHeadlessEditorImpl({
    namespace: "editor",
    nodes,
    onError,
    editable,
    editorState,
  });
}
