import {
  $create,
  $getSelection,
  $getState,
  $getStateChange,
  $setState,
  BaseStaticNodeConfig,
  createState,
  DOMConversionMap,
  DOMConversionOutput,
  DOMExportOutput,
  EditorConfig,
  ElementNode,
  LexicalEditor,
  LexicalNode,
  RangeSelection,
} from "lexical";
import { EDITOR_DATA_NODE_ATTRIBUTE } from "../../utils";

const backgroundState = createState("pb-callout-background",{
    parse: (jsonValue: unknown) => typeof jsonValue === "string" ? jsonValue : null,
})
export const CALLOUT_CONTAINER_NODE_TYPE = "pb-callout-container";

export class CalloutContainerNode extends ElementNode {
  $config(): BaseStaticNodeConfig {
    return this.config(CALLOUT_CONTAINER_NODE_TYPE, {
      extends: ElementNode,
      stateConfigs: [{stateConfig: backgroundState, flat: true}],
    });
  }

  isShadowRoot(): boolean {
    return true;
  }

  createDOM(_config: EditorConfig, _editor: LexicalEditor): HTMLElement {
    const dom = document.createElement("aside");
    dom.setAttribute(EDITOR_DATA_NODE_ATTRIBUTE, CALLOUT_CONTAINER_NODE_TYPE);
    dom.classList.add("pb-callout-container");
    const background = $getState(this, backgroundState);
    if (background) {
      dom.style.background = background;
    }
    return dom;
  }

  updateDOM(
    _prevNode: CalloutContainerNode,
    _dom: HTMLElement,
    _config: EditorConfig
  ): boolean {
    const background = $getStateChange(this, _prevNode, backgroundState);
    if (background?.[0]) {
      _dom.style.background = background[0];
    }
    return false;
  }

  exportDOM(editor: LexicalEditor): DOMExportOutput {
    const dom = document.createElement("aside");
    dom.setAttribute(EDITOR_DATA_NODE_ATTRIBUTE, CALLOUT_CONTAINER_NODE_TYPE);
    dom.classList.add("pb-callout-container");
    const background = $getState(this, backgroundState);
    if (background) {
      dom.style.background = background;
    }
    return {
      element: dom,
    };
  }

  static importDOM(): DOMConversionMap | null {
    return {
      aside: (element) => {
        if (
          element.getAttribute(EDITOR_DATA_NODE_ATTRIBUTE) ===
          CALLOUT_CONTAINER_NODE_TYPE
        ) {
          return {
            conversion: convertAsideToCalloutContainerNode,
            priority: 1,
          };
        }
        return null;
      },
    };
  }

  select(_anchorOffset?: number, _focusOffset?: number): RangeSelection {
    this.getChildAtIndex<ElementNode>(1)?.select();
    return $getSelection() as RangeSelection;
  }
}

export function $createCalloutContainerNode(background?: string): CalloutContainerNode {
  const node = $create(CalloutContainerNode);
  if (background) {
    $setState(node, backgroundState, background);
  }
  return node;
}

export function $isCalloutContainerNode(
  node: LexicalNode | null | undefined
): node is CalloutContainerNode {
  return node instanceof CalloutContainerNode;
}

export function convertAsideToCalloutContainerNode(element: HTMLElement): DOMConversionOutput | null {
    return {
        node: $createCalloutContainerNode(element.style.background),
    }
}