import React, { ElementType, JSX, ReactNode } from "react";
import {
  $create,
  $getState,
  $setState,
  BaseStaticNodeConfig,
  createState,
  DecoratorNode,
  DOMConversionMap,
  DOMConversionOutput,
  DOMExportOutput,
  EditorConfig,
  LexicalEditor,
  LexicalNode,
  NodeKey,
} from "lexical";
import { EDITOR_DATA_NODE_ATTRIBUTE } from "../../utils";
import { CalloutIcon } from "./component";

const iconState = createState("pb-callout-icon", {
  parse: (jsonValue: unknown) => typeof jsonValue === "string" ? jsonValue : null,
});

export const CALLOUT_ICON_NODE_TYPE = "pb-callout-icon";

export class CalloutIconNode extends DecoratorNode<ReactNode> {
  $config(): BaseStaticNodeConfig {
    return this.config(CALLOUT_ICON_NODE_TYPE, {
      extends: DecoratorNode,
    });
  }

  static getType(): string {
    return CALLOUT_ICON_NODE_TYPE;
  }

  createDOM(config: EditorConfig, editor: LexicalEditor): HTMLElement {
    const dom = document.createElement("span");
    dom.setAttribute(EDITOR_DATA_NODE_ATTRIBUTE, CALLOUT_ICON_NODE_TYPE);
    dom.classList.add("pb-callout-icon");
    return dom;
  }

  updateDOM(
    prevNode: CalloutIconNode,
    dom: HTMLElement,
    config: EditorConfig
  ): boolean {
    return false;
  }

  exportDOM(editor: LexicalEditor): DOMExportOutput {
    const dom = document.createElement("span");
    dom.setAttribute(EDITOR_DATA_NODE_ATTRIBUTE, CALLOUT_ICON_NODE_TYPE);
    dom.classList.add("pb-callout-icon");
    const icon = $getState(this, iconState);
    if (icon) {
      dom.setAttribute("data-icon", icon);
    }
    return {
      element: dom,
    };
  }

  static importDOM(): DOMConversionMap | null {
    return {
      span: (element) => {
        if (
          element.getAttribute(EDITOR_DATA_NODE_ATTRIBUTE) ===
          CALLOUT_ICON_NODE_TYPE
        ) {
          return {
            conversion: convertSpanToCalloutIconNode,
            priority: 1,
          };
        }
        return null;
      },
    };
  }

  getIcon(): string {
    return $getState(this, iconState) || "";
  }

  setIcon(icon: string): void {
    $setState(this, iconState, icon);
  }
  decorate(editor: LexicalEditor, config: EditorConfig): ReactNode {
    return <CalloutIcon icon={this.getIcon()} />;
  }
}

export function $createCalloutIconNode(icon: string): CalloutIconNode {
  const node = $create(CalloutIconNode);
  $setState(node, iconState, icon);
  return node;
}

export function $isCalloutIconNode(
  node: LexicalNode | null | undefined
): node is CalloutIconNode {
  return node instanceof CalloutIconNode;
}

function convertSpanToCalloutIconNode(element: HTMLElement): DOMConversionOutput | null {
  const icon = element.getAttribute("data-icon") || "";
  const node = $createCalloutIconNode(icon);
  return {
    node,
  };
}