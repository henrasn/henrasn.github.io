/* eslint-disable react-refresh/only-export-components */
import { Element as SlateElement, Transforms } from "slate"
import { ReactEditor, useFocused, useSelected, useSlate } from "slate-react"
import type { ArticleEditor } from "./editorSchema"
import type { TextLeaf } from "../../../types/slate"
import { lowlight } from "../../../components/article/lowlight"
import type { Root, RootContent } from "hast"

type CustomElement = Extract<SlateElement, { type: string }>
type CodeBlockElement = Extract<CustomElement, { type: "code-block" }>
type CheckItemElement = Extract<CustomElement, { type: "check-item" }>
type ImageElement = Extract<CustomElement, { type: "image" }>
type LinkElement = Extract<CustomElement, { type: "link" }>

type Leaf = TextLeaf & { text: string }

type ElementProps = {
  attributes: Record<string, unknown>
  children: React.ReactNode
  element: SlateElement
}

type LeafProps = {
  attributes: Record<string, unknown>
  children: React.ReactNode
  leaf: Leaf
}

const LANGUAGE_OPTIONS = ["kotlin", "javascript", "xml", "yaml"]

function CodeBlock({
  element,
  children,
}: {
  element: CodeBlockElement
  children: React.ReactNode
}) {
  const editor = useSlate() as ArticleEditor
  const selected = useSelected()
  const focused = useFocused()

  const text = element.children
    .map((line) => (line.children as Leaf[]).map((leaf) => leaf.text).join(""))
    .join("\n")
  const language = element.language && LANGUAGE_OPTIONS.includes(element.language) ? element.language : "kotlin"
  const result = lowlight.highlight(language, text)

  const showControls = selected && focused

  const setLanguage = (lang: string) => {
    Transforms.setNodes(editor, { language: lang } as never, {
      at: ReactEditor.findPath(editor, element),
    })
  }
  const setFilename = (filename: string) => {
    Transforms.setNodes(editor, { filename } as never, {
      at: ReactEditor.findPath(editor, element),
    })
  }
  const convertBack = () => {
    Transforms.setNodes(editor, { type: "paragraph" } as never, {
      at: ReactEditor.findPath(editor, element),
    })
  }

  return (
    <div className="my-4 rounded-xl overflow-hidden bg-[#0d1526] border border-outline-variant/30">
      <div className="flex items-center gap-2 px-3 h-10 bg-surface-container-high border-b border-outline-variant/30">
        <span className="flex gap-1.5" aria-hidden="true">
          <span className="w-3 h-3 rounded-full bg-[#ff5f57]" />
          <span className="w-3 h-3 rounded-full bg-[#febc2e]" />
          <span className="w-3 h-3 rounded-full bg-[#28c840]" />
        </span>
        <span className="ml-2 text-[12px] font-semibold text-on-surface-variant font-mono flex-1 truncate">
          {element.filename ?? "code"}
        </span>
        {showControls && (
          <span className="flex items-center gap-2">
            <input
              value={element.filename ?? ""}
              onChange={(e) => setFilename(e.target.value)}
              placeholder="filename"
              onMouseDown={(e) => e.stopPropagation()}
              className="w-28 bg-background border border-outline-variant/40 rounded px-2 py-0.5 text-[12px] text-on-surface outline-none focus:border-primary"
            />
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              onMouseDown={(e) => e.stopPropagation()}
              className="bg-background border border-outline-variant/40 rounded px-1 py-0.5 text-[12px] text-on-surface outline-none focus:border-primary"
            >
              {LANGUAGE_OPTIONS.map((l) => (
                <option key={l} value={l}>
                  {l}
                </option>
              ))}
            </select>
            <button
              type="button"
              onMouseDown={(e) => {
                e.preventDefault()
                e.stopPropagation()
                convertBack()
              }}
              className="text-on-surface-variant hover:text-on-surface transition-colors"
              aria-label="Convert back to paragraph"
            >
              <span className="material-symbols-outlined text-[16px]" aria-hidden="true">
                close
              </span>
            </button>
          </span>
        )}
      </div>
      <div className="relative">
        <pre className="p-4 overflow-x-auto text-[13px] leading-relaxed font-mono text-on-surface select-none">
          <code>{result.children.map((child, i) => renderToken(child, i))}</code>
        </pre>
        <div className="absolute inset-0 opacity-0 pointer-events-none" contentEditable aria-hidden="true">
          {children}
        </div>
      </div>
    </div>
  )
}

function CheckItem({
  element,
  children,
}: {
  element: CheckItemElement
  children: React.ReactNode
}) {
  const editor = useSlate() as ArticleEditor
  const toggle = () => {
    const path = ReactEditor.findPath(editor, element)
    Transforms.setNodes(editor, { checked: !element.checked } as never, { at: path })
  }
  return (
    <div className="flex items-start gap-2.5 my-1">
      <button
        type="button"
        onMouseDown={(e) => {
          e.preventDefault()
          toggle()
        }}
        className="mt-0.5 text-primary"
        aria-label={element.checked ? "Mark unchecked" : "Mark checked"}
      >
        <span className="material-symbols-outlined text-[20px]" aria-hidden="true">
          {element.checked ? "check_circle" : "radio_button_unchecked"}
        </span>
      </button>
      <span className={`flex-1 ${element.checked ? "line-through text-on-surface-variant" : "text-on-surface"}`}>
        {children}
      </span>
    </div>
  )
}

function renderToken(node: Root | RootContent, key: number): React.ReactNode {
  if (node.type === "text") {
    return node.value
  }
  if (node.type === "element") {
    const className = node.properties?.className
    const cls = Array.isArray(className) ? className.filter(Boolean).join(" ") : undefined
    return (
      <span key={key} className={cls}>
        {node.children.map((child, i) => renderToken(child, i))}
      </span>
    )
  }
  return null
}

function ImageElement({
  element,
  attributes,
}: {
  element: ImageElement
  attributes: Record<string, unknown>
}) {
  const selected = useSelected()
  return (
    <div {...attributes} className={`my-4 ${selected ? "ring-2 ring-primary rounded-lg" : ""}`}>
      <div contentEditable={false}>
        <img src={element.src} alt={element.alt ?? ""} className="w-full rounded-lg object-cover" />
      </div>
    </div>
  )
}

export function renderElement(props: ElementProps) {
  const { attributes, children, element } = props

  switch (element.type) {
    case "heading": {
      const level = (element as Extract<CustomElement, { type: "heading" }>).level
      const className =
        level === 1
          ? "text-[32px] font-[Space_Grotesk] font-semibold text-on-surface my-5 leading-tight"
          : "text-[26px] font-[Space_Grotesk] font-semibold text-on-surface my-5 leading-tight"
      return level === 1 ? (
        <h1 {...attributes} className={className}>
          {children}
        </h1>
      ) : (
        <h2 {...attributes} className={className}>
          {children}
        </h2>
      )
    }
    case "paragraph":
      return (
        <p {...attributes} className="my-2 text-[15px] leading-[1.7] text-on-surface">
          {children}
        </p>
      )
    case "quote":
      return (
        <blockquote {...attributes} className="my-4 border-l-2 border-primary pl-4 text-on-surface-variant italic">
          {children}
        </blockquote>
      )
    case "bulleted-list":
      return (
        <ul {...attributes} className="list-disc pl-5 my-2 text-on-surface space-y-1.5">
          {children}
        </ul>
      )
    case "numbered-list":
      return (
        <ol {...attributes} className="list-decimal pl-5 my-2 text-on-surface space-y-1.5">
          {children}
        </ol>
      )
    case "check-list":
      return (
        <div {...attributes} className="my-2 space-y-1.5">
          {children}
        </div>
      )
    case "list-item":
      return <li {...attributes} className="my-0.5">{children}</li>
    case "check-item":
      return <CheckItem element={element as CheckItemElement} children={children} />
    case "code-block":
      return <CodeBlock element={element as CodeBlockElement} children={children} />
    case "code-line":
      return (
        <div {...attributes} className="min-h-[1.2em]">
          {children}
        </div>
      )
    case "link": {
      const href = (element as LinkElement).href
      return (
        <a {...attributes} href={href} className="text-primary underline decoration-primary/40 underline-offset-2">
          {children}
        </a>
      )
    }
    case "image": {
      const img = element as ImageElement
      return <ImageElement element={img} attributes={attributes} />
    }
    default:
      return (
        <p {...attributes} className="my-2 text-on-surface">
          {children}
        </p>
      )
  }
}

export function renderLeaf(props: LeafProps) {
  const { attributes, children, leaf } = props
  let content = children
  if (leaf.code)
    content = <code className="font-mono text-[0.9em] bg-surface-container-high px-1.5 py-0.5 rounded">{content}</code>
  if (leaf.bold) content = <strong className="font-semibold">{content}</strong>
  if (leaf.italic) content = <em className="italic">{content}</em>
  return <span {...attributes}>{content}</span>
}
