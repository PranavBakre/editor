// import { TOGGLE_LINK_COMMAND } from "@lexical/link";
import { useLexicalEditable } from "@lexical/react/useLexicalEditable";
import {
  $getSelection,
  COMMAND_PRIORITY_LOW,
  FORMAT_TEXT_COMMAND,
  type LexicalEditor,
  SELECTION_CHANGE_COMMAND,
} from "lexical";
import { useCallback, useEffect, useRef } from "react";
import {
  getDOMRangeRect,
  getNativeDOMSelection,
  setFloatingElemPosition,
} from "../../utils/dom";
import { mergeRegister } from "@lexical/utils";

export interface TextFormatFloatingToolbarProps {
  editor: LexicalEditor;
  anchorElem: HTMLElement;
  isLink: boolean;
  isBold: boolean;
  isItalic: boolean;
  isUppercase: boolean;
  isLowercase: boolean;
  isCapitalize: boolean;
  isStrikethrough: boolean;
  isSubscript: boolean;
  isSuperscript: boolean;
  isUnderline: boolean;
  isCode: boolean;
}

export function TextFormatFloatingToolbar({
  editor,
  anchorElem,
  isLink,
  isBold,
  isItalic,
  isUppercase,
  isLowercase,
  isCapitalize,
  isStrikethrough,
  isSubscript,
  isSuperscript,
  isUnderline,
  isCode,
}: TextFormatFloatingToolbarProps) {
  const textFormatFloatingToolbarRef = useRef<HTMLDivElement | null>(null);
  const editable = useLexicalEditable();
    console.log({editable})
  // TODO: Setup control for closing the toolbar for formatting text and opening toolbar for link
//   const _insertLink = useCallback(() => {
//     if (!isLink) {
//       editor.dispatchCommand(TOGGLE_LINK_COMMAND, "https://");
//     } else {
//       editor.dispatchCommand(TOGGLE_LINK_COMMAND, null);
//     }
//   }, [editor, isLink]);

  function mouseMoveListener(e: MouseEvent) {
    if (
      textFormatFloatingToolbarRef?.current &&
      (e.buttons === 1 || e.buttons === 3)
    ) {
      if (textFormatFloatingToolbarRef.current.style.pointerEvents !== "none") {
        const x = e.clientX;
        const y = e.clientY;
        const elementUnderMouse = document.elementFromPoint(x, y);

        if (!textFormatFloatingToolbarRef.current.contains(elementUnderMouse)) {
          // Mouse is not over the target element => not a normal click, but probably a drag
          textFormatFloatingToolbarRef.current.style.pointerEvents = "none";
        }
      }
    }
  }
  function mouseUpListener(_e: MouseEvent) {
    if (textFormatFloatingToolbarRef?.current) {
      if (textFormatFloatingToolbarRef.current.style.pointerEvents !== "auto") {
        textFormatFloatingToolbarRef.current.style.pointerEvents = "auto";
      }
    }
  }

  useEffect(() => {
    if (textFormatFloatingToolbarRef?.current) {
      document.addEventListener("mousemove", mouseMoveListener);
      document.addEventListener("mouseup", mouseUpListener);

      return () => {
        document.removeEventListener("mousemove", mouseMoveListener);
        document.removeEventListener("mouseup", mouseUpListener);
      };
    }
  }, [textFormatFloatingToolbarRef]);

  const $updateTextFormatFloatingToolbar = useCallback(() => {
    const selection = $getSelection();

    const textFormattingToolbarElem = textFormatFloatingToolbarRef.current;
    const nativeSelection = getNativeDOMSelection(editor._window);

    if (textFormattingToolbarElem === null) {
      return;
    }

    const rootElement = editor.getRootElement();
    if (
      selection !== null &&
      nativeSelection !== null &&
      !nativeSelection.isCollapsed &&
      rootElement !== null &&
      rootElement.contains(nativeSelection.anchorNode)
    ) {
      const rangeRect = getDOMRangeRect(nativeSelection, rootElement);

      setFloatingElemPosition(
        rangeRect,
        textFormattingToolbarElem,
        anchorElem,
        isLink,
      );
    }
  }, [editor, anchorElem, isLink]);

  useEffect(() => {
    const scrollerElem = anchorElem.parentElement;

    const update = () => {
      editor.getEditorState().read(() => {
        $updateTextFormatFloatingToolbar();
      });
    };

    window.addEventListener("resize", update);
    if (scrollerElem) {
      scrollerElem.addEventListener("scroll", update);
    }

    return () => {
      window.removeEventListener("resize", update);
      if (scrollerElem) {
        scrollerElem.removeEventListener("scroll", update);
      }
    };
  }, [editor, $updateTextFormatFloatingToolbar, anchorElem]);

  useEffect(() => {
    editor.getEditorState().read(() => {
      $updateTextFormatFloatingToolbar();
    });
    return mergeRegister(
      editor.registerUpdateListener(({ editorState }) => {
        editorState.read(() => {
          $updateTextFormatFloatingToolbar();
        });
      }),

      editor.registerCommand(
        SELECTION_CHANGE_COMMAND,
        () => {
          $updateTextFormatFloatingToolbar();
          return false;
        },
        COMMAND_PRIORITY_LOW,
      ),
    );
  }, [editor, $updateTextFormatFloatingToolbar]);

  return (
    <div ref={textFormatFloatingToolbarRef} className="text-formatting-toolbar">
      {editable && (
        <>
          <button
            type="button"
            onClick={() => {
              editor.dispatchCommand(FORMAT_TEXT_COMMAND, "bold");
            }}
            className={
              "text-formatting-toolbar-item text-formatting-toolbar-item-bold spaced  " + (isBold ? "active" : "")
            }
            title="Bold"
            aria-label="Format text as bold"
          >
            <span>B</span>
          </button>
          <button
            type="button"
            onClick={() => {
              editor.dispatchCommand(FORMAT_TEXT_COMMAND, "italic");
            }}
            className={
              "text-formatting-toolbar-item text-formatting-toolbar-item-italic spaced " +
              (isItalic ? "active" : "")
            }
            title="Italic"
            aria-label="Format text as italics"
          >
            <span>I</span>
          </button>
          <button
            type="button"
            onClick={() => {
              editor.dispatchCommand(FORMAT_TEXT_COMMAND, "underline");
            }}
            className={
              "text-formatting-toolbar-item text-formatting-toolbar-item-underline spaced " +
              (isUnderline ? "active" : "")
            }
            title="Underline"
            aria-label="Format text to underlined"
          >
            <span>U</span>
          </button>
          <button
            type="button"
            onClick={() => {
              editor.dispatchCommand(FORMAT_TEXT_COMMAND, "strikethrough");
            }}
            className={
              "text-formatting-toolbar-item text-formatting-toolbar-item-strikethrough spaced " +
              (isStrikethrough ? "active" : "")
            }
            title="Strikethrough"
            aria-label="Format text with a strikethrough"
          >
            <span>S</span>
          </button>
          <button
            type="button"
            onClick={() => {
              editor.dispatchCommand(FORMAT_TEXT_COMMAND, "subscript");
            }}
            className={
              "text-formatting-toolbar-item text-formatting-toolbar-item-subscript spaced " +
              (isSubscript ? "active" : "")
            }
            title="Subscript"
            aria-label="Format Subscript"
          >A
            <span>s</span>
          </button>
          <button
            type="button"
            onClick={() => {
              editor.dispatchCommand(FORMAT_TEXT_COMMAND, "superscript");
            }}
            className={
              "text-formatting-toolbar-item text-formatting-toolbar-item-superscript spaced " +
              (isSuperscript ? "active" : "")
            }
            title="Superscript"
            aria-label="Format Superscript"
          >A
            <span>s</span>
          </button>
          <button
            type="button"
            onClick={() => {
              editor.dispatchCommand(FORMAT_TEXT_COMMAND, "uppercase");
            }}
            className={
              "text-formatting-toolbar-item text-formatting-toolbar-item-uppercase spaced " +
              (isUppercase ? "active" : "")
            }
            title="Uppercase"
            aria-label="Format text to uppercase"
          >
            <span>AA</span>
          </button>
          <button
            type="button"
            onClick={() => {
              editor.dispatchCommand(FORMAT_TEXT_COMMAND, "lowercase");
            }}
            className={
              "text-formatting-toolbar-item text-formatting-toolbar-item-lowercase spaced " +
              (isLowercase ? "active" : "")
            }
            title="Lowercase"
            aria-label="Format text to lowercase"
          >
            <span>aa</span>
          </button>
          <button
            type="button"
            onClick={() => {
              editor.dispatchCommand(FORMAT_TEXT_COMMAND, "capitalize");
            }}
            className={
              "text-formatting-toolbar-item text-formatting-toolbar-item-capitalize spaced " +
              (isCapitalize ? "active" : "")
            }
            title="Capitalize"
            aria-label="Format text to capitalize"
          >
            <span>Aa</span>
          </button>
          <button
            type="button"
            onClick={() => {
              editor.dispatchCommand(FORMAT_TEXT_COMMAND, "code");
            }}
            className={
              "text-formatting-toolbar-item text-formatting-toolbar-item-code spaced " + (isCode ? "active" : "")
            }
            title="Insert code block"
            aria-label="Insert code block"
          >
            <span>&lt;&gt;</span>
          </button>
        </>
      )}
    </div>
  );
}
