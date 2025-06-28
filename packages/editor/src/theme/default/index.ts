import type { EditorThemeClasses } from "lexical";

export const theme: EditorThemeClasses = {
  link: "link",
  paragraph: "paragraph",
  heading: {
    h1: "h1",
    h2: "h2",
    h3: "h3",
    h4: "h4",
    h5: "h5",
    h6: "h6",
  },
  list: {
    ol: "ol",
    ul: "ul",
    listitem: "listitem",
    listitemChecked: "listItemChecked",
    listitemUnchecked: "listItemUnchecked",
    nested: {
      listitem: "nestedlistitem",
    },
  },
  quote: "quote",
  text: {
    underline: "text-underline",
    strikethrough: "text-strikethrough",
    code: "text-code",
    bold: "text-bold",
    italic: "text-italic",
    underlineStrikethrough: "text-underlineStrikethrough",
    capitalize: "text-capitalize",
    lowercase: "text-lowercase",
    uppercase: "text-uppercase",
    subscript: "text-subscript",
    superscript: "text-superscript",
  },
};
