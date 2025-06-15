import type { Route } from "./+types/home";
import { Editor } from "@repo/editor/editor";
import "@repo/editor/theme/default/css";
import { theme } from "@repo/editor/theme/default/js";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function Home() {
  return <Editor onError={() => {}} editable={true} theme={theme} children={<div></div>} />;
}
