import {WebsocketProvider} from 'y-websocket';
import { Doc } from "@repo/editor/features/collaboration/index";

export function createWebsocketProvider(
  id: string,
  yjsDocMap: Map<string, Doc>,
) {
  const doc = getDocFromMap(id, yjsDocMap);

  const provider = new WebsocketProvider('ws://localhost:8787/room', id, doc, {
    connect: false,
  });

  provider.on("connection-close", (connection) => {
    console.log("connection-close", connection);
  });

  provider.on("status", (connection) => {
    console.log("status", connection);
  });

  provider.on("connection-error", (connection, error) => {
    console.log("connection-error", connection, error);
  });

  provider.on("sync", (connection) => {
    console.log("synced", connection);
  });

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
