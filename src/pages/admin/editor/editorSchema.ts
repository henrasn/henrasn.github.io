import { withHistory } from "slate-history"
import { Editor, Element, Transforms, type Node } from "slate"
import type { ReactEditor } from "slate-react"
import type { SlateNode } from "../../../types/slate"

export type ArticleEditor = Editor & ReactEditor

export const isSlateNodeArray = (value: unknown): value is SlateNode[] =>
  Array.isArray(value) &&
  value.every(
    (node) =>
      typeof node === "object" &&
      node !== null &&
      typeof (node as { type?: unknown }).type === "string" &&
      Array.isArray((node as { children?: unknown }).children),
  )

export type ArticlePayload = {
  metadata: Record<string, unknown>
  content: SlateNode[]
}

export const isArticlePayload = (value: unknown): value is ArticlePayload => {
  if (typeof value !== "object" || value === null) return false
  const record = value as Record<string, unknown>
  return (
    typeof record.metadata === "object" &&
    record.metadata !== null &&
    isSlateNodeArray(record.content)
  )
}

const inlineTypes = new Set(["link"])

const isListType = (type: string) =>
  type === "bulleted-list" || type === "numbered-list" || type === "check-list"

const isListItemType = (type: string) => type === "list-item" || type === "check-item"

export function withArticleSchema<T extends Editor>(editor: T): T & ReactEditor {
  const { normalizeNode, isInline } = editor

  editor.isInline = (element: Element) => {
    if (inlineTypes.has(element.type)) return true
    return isInline(element)
  }
  editor.normalizeNode = (entry) => {
    const [node, path] = entry

    if (Element.isElement(node)) {
      const type = node.type

      if (isListType(type) && node.children.length > 0) {
        for (const [index, child] of node.children.entries()) {
          if (!Element.isElement(child) || !isListItemType(child.type)) {
            Transforms.unwrapNodes(editor, { at: path })
            return
          }
          if (index < node.children.length - 1 && child.type === "check-item" && type !== "check-list") {
            Transforms.setNodes(editor, { type: "list-item" }, { at: [...path, index] })
            return
          }
        }
      }

      if (isListItemType(type) && node.children.length > 0) {
        for (const [index, child] of node.children.entries()) {
          if (
            Element.isElement(child) &&
            isListType(child.type as string) &&
            child.children.length > 0
          ) {
            for (const [childIndex, grandchild] of child.children.entries()) {
              if (!Element.isElement(grandchild) || !isListItemType(grandchild.type)) {
                Transforms.unwrapNodes(editor, { at: [...path, index, childIndex] })
                return
              }
            }
          }
        }
      }

      if (type === "code-block" && node.children.length > 0) {
        for (const [index, child] of node.children.entries()) {
          if (!Element.isElement(child) || child.type !== "code-line") {
            Transforms.wrapNodes(editor, { type: "code-line", children: [{ text: "" }] }, { at: [...path, index] })
            return
          }
        }
      }

      if (type === "code-line" && node.children.length > 0) {
        for (const [index, child] of node.children.entries()) {
          if (Element.isElement(child)) {
            Transforms.unwrapNodes(editor, { at: [...path, index] })
            return
          }
        }
      }
    }

    normalizeNode(entry)
  }

  return editor as T & ReactEditor
}

export function withArticleHistory(editor: ArticleEditor): ArticleEditor {
  return withArticleSchema(withHistory(editor)) as ArticleEditor
}

export function emptyParagraph(): Node {
  return { type: "paragraph", children: [{ text: "" }] }
}
