import { YDurableObjects } from "y-durableobjects";

export type Bindings = {
  EDITOR_YDOC_DO: DurableObjectNamespace<YDurableObjects<Env>>;
};

export type Env = {
  Bindings: Bindings;
};
