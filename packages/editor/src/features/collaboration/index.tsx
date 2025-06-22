import { type FeatureContextType, withFeature } from "../setup";
import { CollaborationPlugin as LexicalCollaborationPlugin } from "@lexical/react/LexicalCollaborationPlugin";
import { type InitialEditorStateType } from "@lexical/react/LexicalComposer";

export { Doc } from "yjs";

export const CollaborationPlugin = withFeature("collaboration")(
  function CollaborationPlugin({ feature, initialState }: { feature: NonNullable<FeatureContextType["collaboration"]>; initialState?: InitialEditorStateType }) {
    return (
      <LexicalCollaborationPlugin
        providerFactory={feature.providerFactory}
        id={feature.id}
        cursorColor={feature.user.cursorColor}
        shouldBootstrap={false}
        initialEditorState={initialState}
      />
    );
  }
);
