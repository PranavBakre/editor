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
      <Editor
        onError={(e) => {console.log(e)}}
        editable={true}
        theme={theme}
        placeholder={<div>Enter text</div>}
        features={features}
      />
  );
}
