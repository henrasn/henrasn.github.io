import type {
  SlateBlockNode,
  SlateNode,
  TextLeaf,
  LinkNode,
} from "../../types/slate"
import type { Root, RootContent } from "hast"
import { lowlight } from "./lowlight"
import "./prose.css"

function warnUnknown(type: string) {
  if (import.meta.env.DEV) {
    console.warn(`[SlateArticleViewer] unknown node type: ${type}`)
  }
}

function renderInline(node: TextLeaf | LinkNode, index: number) {
  if ("href" in node) {
    return (
      <a key={index} href={node.href}>
        {node.children.map(renderInline)}
      </a>
    )
  }

  let content: React.ReactNode = node.text
  if (node.code) content = <code>{content}</code>
  if (node.bold) content = <strong>{content}</strong>
  if (node.italic) content = <em>{content}</em>
  return <span key={index}>{content}</span>
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

function renderCodeBlock(node: Extract<SlateBlockNode, { type: "code-block" }>) {
  const text = node.children
    .map((line) => line.children.map((leaf) => leaf.text).join(""))
    .join("\n")
  const language = node.language ?? "text"
  const result = lowlight.highlight(language, text)

  return (
    <pre data-filename={node.filename}>
      <code>{result.children.map((child, i) => renderToken(child, i))}</code>
    </pre>
  )
}

function renderBlockNode(node: SlateBlockNode, index: number): React.ReactNode {
  switch (node.type) {
    case "heading":
      return node.level === 1 ? (
        <h1 key={index}>{node.children.map(renderInline)}</h1>
      ) : (
        <h2 key={index}>{node.children.map(renderInline)}</h2>
      )
    case "paragraph":
      return <p key={index}>{node.children.map(renderInline)}</p>
    case "quote":
      return <blockquote key={index}>{node.children.map(renderInline)}</blockquote>
    case "code-block":
      return <div key={index}>{renderCodeBlock(node)}</div>
    case "bulleted-list":
      return (
        <ul key={index}>
          {node.children.map((item, i) => (
            <li key={i}>{item.children.map(renderInline)}</li>
          ))}
        </ul>
      )
    case "numbered-list":
      return (
        <ol key={index}>
          {node.children.map((item, i) => (
            <li key={i}>{item.children.map(renderInline)}</li>
          ))}
        </ol>
      )
    case "check-list":
      return (
        <ul key={index} data-type="taskList">
          {node.children.map((item, i) => (
            <li key={i} data-type="taskItem">
              <label>
                <input type="checkbox" checked={item.checked} onChange={() => {}} tabIndex={-1} />
                <span>{item.children.map(renderInline)}</span>
              </label>
            </li>
          ))}
        </ul>
      )
    case "image":
      return <img key={index} src={node.src} alt={node.alt ?? ""} />
    default:
      warnUnknown((node as { type?: string }).type ?? "unknown")
      return null
  }
}

export function SlateArticleViewer({ content }: { content: SlateNode[] }) {
  return <div className="kinetic-prose">{content.map(renderBlockNode)}</div>
}
