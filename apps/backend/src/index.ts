import { Hono } from "hono";
import { cors } from "hono/cors";
import { YDurableObjects, type YDurableObjectsAppType } from "y-durableobjects";
import { upgrade } from "y-durableobjects/helpers/upgrade";
import { hc } from "hono/client";
import { Env } from "./types";

const app = new Hono<Env>();
app.use("*", cors());
app.get("/room/:roomId", upgrade(), async (c) => {
  const id = c.env.EDITOR_YDOC_DO.idFromName(c.req.param("roomId"));
  const stub = c.env.EDITOR_YDOC_DO.get(id);

  const url = new URL("/", c.req.url);
  const client = hc<YDurableObjectsAppType>(url.toString(), {
    fetch: stub.fetch.bind(stub),
  });

  const res = await client.rooms[":roomId"].$get(
    { param: { roomId: c.req.param("roomId") } },
    { init: { headers: c.req.raw.headers } },
  );

  return new Response(null, {
    webSocket: res.webSocket,
    status: res.status,
    statusText: res.statusText,
  });
});

export default app;
export type AppType = typeof app;
export { YDurableObjects };
