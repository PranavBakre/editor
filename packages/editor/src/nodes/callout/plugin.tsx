import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { $findMatchingParent, mergeRegister } from "@lexical/utils";
import {
  $createParagraphNode,
  $createTextNode,
  $getSelection,
  $insertNodes,
  $isRangeSelection,
  COMMAND_PRIORITY_LOW,
  createCommand,
  KEY_ARROW_DOWN_COMMAND,
  KEY_ARROW_UP_COMMAND,
} from "lexical";
import { useEffect } from "react";
import {
  $createCalloutContainerNode,
  $isCalloutContainerNode,
  CalloutContainerNode,
} from "./callout-container/node";
import {
  $createCalloutIconNode,
  CalloutIconNode,
} from "./callout-icon/node";
import {
  $createCalloutContentNode,
  CalloutContentNode,
} from "./callout-content/node";

export const CREATE_CALLOUT_COMMAND = createCommand("CREATE_CALLOUT_COMMAND");
export const DELETE_CALLOUT_COMMAND = createCommand("DELETE_CALLOUT_COMMAND");

export function CalloutPlugin() {
  const [editor] = useLexicalComposerContext();

  useEffect(() => {
    if (
      !editor.hasNodes([
        CalloutContainerNode,
        CalloutIconNode,
        CalloutContentNode,
      ])
    ) {
      throw new Error(
        "CalloutPlugin: CalloutContainerNode, CalloutIconNode, or CalloutContentNode not registered on editor"
      );
    }
    return mergeRegister(
      editor.registerCommand(
        CREATE_CALLOUT_COMMAND,
        () => {
          const containerNode = $createCalloutContainerNode();

          containerNode.append($createCalloutIconNode("💡"));
          const contentNode = $createCalloutContentNode();
          containerNode.append(contentNode);

          contentNode.append($createParagraphNode().append($createTextNode("Hello")));
          $insertNodes([containerNode]);

          contentNode.select();
          return true;
        },
        COMMAND_PRIORITY_LOW
      ),
      editor.registerCommand(
        DELETE_CALLOUT_COMMAND,
        () => {
          const selection = $getSelection();
          if ($isRangeSelection(selection)) {
            const node = selection.getNodes()[0];
            if (node === null || node === undefined) {
              return false;
            }
            const calloutContainerNode = $findMatchingParent(node, (parent) =>
              $isCalloutContainerNode(parent)
            );

            if (
              calloutContainerNode === null ||
              calloutContainerNode === undefined
            ) {
              return false;
            }

            calloutContainerNode.remove();
            return true;
          }
          return false;
        },
        COMMAND_PRIORITY_LOW
      ),
      editor.registerMutationListener(CalloutContentNode, (nodes, payload) => {
        for (const [nodeKey, nodeMutation] of nodes) {
          if (nodeMutation === "destroyed") {
            editor.dispatchCommand(DELETE_CALLOUT_COMMAND, null);
            return true;
          }
        }
        return false;
      }),
      editor.registerCommand(KEY_ARROW_DOWN_COMMAND, (event) => {
        const selection = $getSelection();

        if(!$isRangeSelection(selection)) {
          return false;
        }

        const node = selection.getNodes()[0];
        if(node === null || node === undefined) {
          return false;
        }

        const calloutContainerNode = $findMatchingParent(node, (parent) => $isCalloutContainerNode(parent));

        if(calloutContainerNode === null || calloutContainerNode === undefined) {
          return false;
        }

        calloutContainerNode.selectNext();
        return true;
      }, COMMAND_PRIORITY_LOW),
      editor.registerCommand(KEY_ARROW_UP_COMMAND, (event) => {
        const selection = $getSelection();

        if(!$isRangeSelection(selection)) {
          return false;
        }

        const node = selection.getNodes()[0];
        if(node === null || node === undefined) {
          return false;
        }

        const calloutContainerNode = $findMatchingParent(node, (parent) => $isCalloutContainerNode(parent));

        if(calloutContainerNode === null || calloutContainerNode === undefined) {
          return false;
        }

        calloutContainerNode.selectPrevious();
        return true;
      }, COMMAND_PRIORITY_LOW),
    );
  }, [editor]);
  return null;
}
