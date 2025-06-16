import { Editor } from "@repo/editor/editor";
import { theme } from "@repo/editor/theme/default";

import "@repo/editor/theme/default.css";
import "./App.css";
export default function Home() {
  return <Editor onError={() => {}} editable={true} theme={theme} children={<div></div>} />;
}
