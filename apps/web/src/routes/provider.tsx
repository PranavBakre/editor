import { WebsocketProvider } from "y-websocket";
import { Doc } from "@repo/editor/features/collaboration/index";

export function createWebsocketProvider(
  id: string,
  yjsDocMap: Map<string, Doc>,
) {
  const doc = getDocFromMap(id, yjsDocMap);

  const provider = new WebsocketProvider(
    import.meta.env.VITE_API_WS_URL,
    id,
    doc,
    {
      connect: false,
    },
  );

  return provider;
}

function getDocFromMap(id: string, yjsDocMap: Map<string, Doc>): Doc {
  let doc = yjsDocMap.get(id);

  if (doc === undefined) {
    doc = new Doc();
    yjsDocMap.set(id, doc);
  } else {
    doc.load();
  }

  return doc;
}
