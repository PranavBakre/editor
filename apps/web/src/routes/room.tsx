import { Editor, type EditorProps } from "@repo/editor/editor";
import { theme } from "@repo/editor/theme/default";

import { useMemo } from "react";
import { useParams } from "react-router-dom";
import { createWebsocketProvider } from "./provider";
import "@repo/editor/theme/default.css";
import "../modules/room/style.css";

export default function Room() {
  const { roomId } = useParams();

  // @ts-ignore
  const features = useMemo<EditorProps["features"]>(() => {
    return {
      collaboration: {
        id: roomId,
        providerFactory: createWebsocketProvider,
        active: true,
        user: {
          name: "User",
          color: "#000000",
          lightColor: "#00000033",
          focusing: false,
          focusPos: null,
          anchorPos: null,
        },
      },
    };
  }, [roomId]);

  return (
    <div className="min-h-screen w-screen flex flex-col lg:px-40 lg:pt-24">
      <Editor
        onError={(e) => {
          console.log(e);
        }}
        editable={true}
        editorClasses={theme}
        colorScheme="theme-sepia-light"
        placeholder={<div>Enter text</div>}
        features={features}
        className="lg:w-3xl bg-white lg:rounded-t-lg mx-auto text-black p-5 lg:p-20"
      />
    </div>
  );
}
