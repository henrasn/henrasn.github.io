/* eslint-disable react-refresh/only-export-components */
import { useCallback } from "react"
import { Editor, Transforms, Element as SlateElement } from "slate"
import { ReactEditor, useSlate } from "slate-react"
import type { ArticleEditor } from "./editorSchema"

type ToolbarProps = {
  onLink: () => void
  onImage: () => void
  saved: "saved" | "error" | "idle"
}

type ButtonProps = {
  active?: boolean
  onMouseDown: (e: React.MouseEvent) => void
  label: string
  icon: string
}

function ToolbarButton({ active, onMouseDown, label, icon }: ButtonProps) {
  return (
    <button
      type="button"
      aria-label={label}
      title={label}
      onMouseDown={onMouseDown}
      className={`w-8 h-8 flex items-center justify-center rounded-md transition-colors ${
        active
          ? "bg-primary/20 text-primary"
          : "text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface"
      }`}
    >
      <span className="material-symbols-outlined text-[18px]" aria-hidden="true">
        {icon}
      </span>
    </button>
  )
}

const LIST_TYPES = new Set(["bulleted-list", "numbered-list", "check-list"])
const TEXT_ALIGN_TYPES = ["left", "center", "right", "justify"]

const isBlockActive = (editor: ArticleEditor, type: string, blockType = "type") => {
  const { selection } = editor
  if (!selection) return false
  const [match] = Array.from(
    Editor.nodes(editor, {
      at: Editor.unhangRange(editor, selection),
      match: (n) =>
        !Editor.isEditor(n) &&
        SlateElement.isElement(n) &&
        (n as unknown as Record<string, unknown>)[blockType] === type,
    }),
  )
  return Boolean(match)
}

const isMarkActive = (editor: ArticleEditor, format: string) => {
  const marks = Editor.marks(editor) as Record<string, boolean> | null
  return marks ? Boolean(marks[format]) : false
}

export const toggleMark = (editor: ArticleEditor, format: string) => {
  const isActive = isMarkActive(editor, format)
  if (isActive) {
    Editor.removeMark(editor, format)
  } else {
    Editor.addMark(editor, format, true)
  }
}

export const toggleBlock = (editor: ArticleEditor, format: string) => {
  const isActive = isBlockActive(editor, format)
  const isList = LIST_TYPES.has(format)

  Transforms.unwrapNodes(editor, {
    match: (n) =>
      !Editor.isEditor(n) &&
      SlateElement.isElement(n) &&
      LIST_TYPES.has((n as unknown as { type?: string }).type ?? "") &&
      !TEXT_ALIGN_TYPES.includes(format),
    split: true,
  })

  let newProperties: Partial<SlateElement>
  if (isActive) {
    newProperties = { type: "paragraph" }
  } else {
    newProperties = { type: format } as Partial<SlateElement>
  }

  Transforms.setNodes<SlateElement>(editor, newProperties)

  if (!isActive && isList) {
    const block = { type: format, children: [{ type: "list-item", children: [{ text: "" }] }] }
    Transforms.wrapNodes(editor, block as SlateElement)
  }
}

const setHeading = (editor: ArticleEditor, level: 1 | 2) => {
  const isActive = isBlockActive(editor, "heading") && isBlockActive(editor, String(level), "level")
  Transforms.setNodes(editor, isActive ? { type: "paragraph" } : { type: "heading", level })
}

function useToolbarCommands(editor: ArticleEditor) {
  const onHeading = useCallback(
    (level: 1 | 2) => (e: React.MouseEvent) => {
      e.preventDefault()
      setHeading(editor, level)
    },
    [editor],
  )
  const onMark = useCallback(
    (format: string) => (e: React.MouseEvent) => {
      e.preventDefault()
      toggleMark(editor, format)
    },
    [editor],
  )
  const onBlock = useCallback(
    (format: string) => (e: React.MouseEvent) => {
      e.preventDefault()
      toggleBlock(editor, format)
    },
    [editor],
  )
  return { onHeading, onMark, onBlock }
}

export function EditorToolbar({ onLink, onImage, saved }: ToolbarProps) {
  const editor = useSlate() as ArticleEditor
  const { onHeading, onMark, onBlock } = useToolbarCommands(editor)
  const isHeadingActive = (level: 1 | 2) =>
    isBlockActive(editor, "heading") && isBlockActive(editor, String(level), "level")

  return (
    <div className="sticky top-0 z-30 flex items-center gap-1 px-3 py-2 bg-surface-container border-b border-outline-variant/20 flex-wrap">
      <ToolbarButton active={isHeadingActive(1)} onMouseDown={onHeading(1)} label="Heading 1" icon="title" />
      <ToolbarButton active={isHeadingActive(2)} onMouseDown={onHeading(2)} label="Heading 2" icon="text_fields" />

      <span className="w-px h-6 bg-outline-variant/30 mx-1" aria-hidden="true" />

      <ToolbarButton active={isMarkActive(editor, "bold")} onMouseDown={onMark("bold")} label="Bold" icon="format_bold" />
      <ToolbarButton active={isMarkActive(editor, "italic")} onMouseDown={onMark("italic")} label="Italic" icon="format_italic" />
      <ToolbarButton active={isMarkActive(editor, "code")} onMouseDown={onMark("code")} label="Inline code" icon="code" />
      <ToolbarButton active={isBlockActive(editor, "code-block")} onMouseDown={onBlock("code-block")} label="Code block" icon="data_object" />
      <ToolbarButton active={isBlockActive(editor, "quote")} onMouseDown={onBlock("quote")} label="Quote" icon="format_quote" />

      <span className="w-px h-6 bg-outline-variant/30 mx-1" aria-hidden="true" />

      <ToolbarButton onMouseDown={onLink} label="Link" icon="link" />
      <ToolbarButton onMouseDown={onImage} label="Image" icon="image" />

      <span className="w-px h-6 bg-outline-variant/30 mx-1" aria-hidden="true" />

      <ToolbarButton active={isBlockActive(editor, "bulleted-list")} onMouseDown={onBlock("bulleted-list")} label="Bulleted list" icon="format_list_bulleted" />
      <ToolbarButton active={isBlockActive(editor, "numbered-list")} onMouseDown={onBlock("numbered-list")} label="Numbered list" icon="format_list_numbered" />
      <ToolbarButton active={isBlockActive(editor, "check-list")} onMouseDown={onBlock("check-list")} label="Checklist" icon="checklist" />

      <div className="flex-1" />

      {saved === "saved" && (
        <span className="flex items-center gap-1 text-[12px] font-semibold text-secondary uppercase">
          <span className="material-symbols-outlined text-[16px]" aria-hidden="true">
            cloud_done
          </span>
          Saved
        </span>
      )}
      {saved === "error" && (
        <span className="flex items-center gap-1 text-[12px] font-semibold text-error uppercase">
          <span className="material-symbols-outlined text-[16px]" aria-hidden="true">
            cloud_off
          </span>
          Save failed
        </span>
      )}
    </div>
  )
}

export { ReactEditor }
