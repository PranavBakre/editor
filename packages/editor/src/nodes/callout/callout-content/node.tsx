import {
    $create,
    BaseStaticNodeConfig,
    DOMConversionMap,
    DOMConversionOutput,
    DOMExportOutput,
    EditorConfig,
    ElementNode,
    LexicalEditor,
    LexicalNode,
  } from "lexical";
  import { EDITOR_DATA_NODE_ATTRIBUTE } from "../../utils";
  
  export const CALLOUT_CONTENT_NODE_TYPE = "pb-callout-content";
  
  export class CalloutContentNode extends ElementNode {
    $config(): BaseStaticNodeConfig {
      return this.config(CALLOUT_CONTENT_NODE_TYPE, {
        extends: ElementNode,
      });
    }
  
    isShadowRoot(): boolean {
      return true;
    }
  
    createDOM(_config: EditorConfig, _editor: LexicalEditor): HTMLElement {
      const dom = document.createElement("section");
      dom.setAttribute("pb-editor-node", CALLOUT_CONTENT_NODE_TYPE);
      dom.classList.add("pb-callout-content");
      return dom;
    }
  
    updateDOM(
      _prevNode: CalloutContentNode,
      _dom: HTMLElement,
      _config: EditorConfig
    ): boolean {
      return false;
    }
  
    exportDOM(editor: LexicalEditor): DOMExportOutput {
      const dom = document.createElement("section");
      dom.setAttribute(EDITOR_DATA_NODE_ATTRIBUTE, CALLOUT_CONTENT_NODE_TYPE);
      dom.classList.add("pb-callout-content");
      return {
        element: dom,
      };
    }
  
    static importDOM(): DOMConversionMap | null {
      return {
        section: (element) => {
          if (
            element.getAttribute(EDITOR_DATA_NODE_ATTRIBUTE) ===
            CALLOUT_CONTENT_NODE_TYPE
          ) {
            return {
              conversion: convertSectionToCalloutContentNode,
              priority: 1,
            };
          }
          return null;
        },
      };
    }
  }
  
  export function $createCalloutContentNode(): CalloutContentNode {
    return $create(CalloutContentNode);
  }
  
  export function $isCalloutContentNode(
    node: LexicalNode | null | undefined
  ): node is CalloutContentNode {
    return node instanceof CalloutContentNode;
  }
  
  function convertSectionToCalloutContentNode(element: HTMLElement): DOMConversionOutput | null {
    const node = $createCalloutContentNode();
    return {
      node,
    };
  }
  