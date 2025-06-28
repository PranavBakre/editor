import { MarkdownShortcutPlugin } from "@lexical/react/LexicalMarkdownShortcutPlugin";
import { type ReactNode } from "react";

import { TRANSFORMERS } from "./transformers";

export default function MarkdownPlugin(): ReactNode {
  return <MarkdownShortcutPlugin transformers={TRANSFORMERS} />;
}
