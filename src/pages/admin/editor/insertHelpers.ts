import { Range, Transforms } from "slate"
import type { ArticleEditor } from "./editorSchema"

export function insertLink(editor: ArticleEditor, url: string) {
  if (!editor.selection) return
  if (!Range.isCollapsed(editor.selection)) {
    Transforms.wrapNodes(editor, { type: "link", href: url, children: [] })
    Transforms.collapse(editor, { edge: "end" })
  } else {
    Transforms.insertNodes(editor, {
      type: "link",
      href: url,
      children: [{ text: url }],
    })
  }
}

export function insertImage(editor: ArticleEditor, url: string, alt: string) {
  if (!editor.selection) return
  Transforms.insertNodes(editor, { type: "image", src: url, alt, children: [] })
  Transforms.insertNodes(editor, { type: "paragraph", children: [{ text: "" }] })
}
