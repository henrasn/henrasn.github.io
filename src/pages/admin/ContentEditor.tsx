import { useCallback, useMemo, useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { createEditor } from "slate"
import { Editable, Slate, withReact } from "slate-react"
import { getArticle, listArticles, type ArticleMetadata } from "../../data/articles"
import { saveArticle } from "../../admin/writeArticle"
import { emptyParagraph, withArticleHistory } from "./editor/editorSchema"
import { renderElement, renderLeaf } from "./editor/elements"
import { EditorToolbar } from "./editor/EditorToolbar"
import { MetadataSidebar } from "./editor/MetadataSidebar"
import { insertImage, insertLink } from "./editor/insertHelpers"
import type { SlateNode } from "../../types/slate"

type SavedState = "saved" | "error" | "idle"

export default function ContentEditor() {
  const { projectId = "" } = useParams()
  const navigate = useNavigate()
  const projectIds = useMemo(() => listArticles().map((a) => a.projectId), [])

  return (
    <div className="px-6 py-6 max-w-6xl mx-auto">
      <div className="flex items-center gap-3 mb-6">
        <select
          value={projectId}
          onChange={(e) => navigate(`/admin/editor/${e.target.value}`)}
          className="bg-surface-container-high border border-outline-variant/30 rounded-lg px-3 py-2 text-[14px] font-semibold text-on-surface outline-none focus:border-primary"
        >
          {projectIds.length === 0 && <option value="">No articles</option>}
          {projectIds.map((id) => (
            <option key={id} value={id}>
              {id}
            </option>
          ))}
        </select>
        <span className="text-[13px] text-on-surface-variant">
          <span className="material-symbols-outlined text-[16px] align-middle mr-1" aria-hidden="true">
            article
          </span>
          Content Editor
        </span>
        <div className="flex-1" />
      </div>
      <Editor key={projectId} projectId={projectId} />
    </div>
  )
}

function Editor({ projectId }: { projectId: string }) {
  const article = getArticle(projectId)
  const editor = useMemo(() => withArticleHistory(withReact(createEditor())), [])

  const [metadata, setMetadata] = useState<ArticleMetadata>(() =>
    article ? { ...article.metadata } : { title: "Untitled", tags: [] },
  )
  const [content, setContent] = useState<SlateNode[]>(() =>
    article && article.content.length > 0 ? article.content : [emptyParagraph() as SlateNode],
  )
  const [saved, setSaved] = useState<SavedState>("idle")

  const applyMetadata = useCallback((patch: Partial<ArticleMetadata>) => {
    setMetadata((prev) => ({ ...prev, ...patch }))
  }, [])

  const persist = useCallback(
    async (nextMetadata: ArticleMetadata, nextContent: SlateNode[]) => {
      const snapshot = { metadata: nextMetadata, content: nextContent }
      const ok = await saveArticle(projectId, snapshot)
      setSaved(ok ? "saved" : "error")
    },
    [projectId],
  )

  const handleSave = useCallback(
    async (status: "Draft" | "Published" | "Private") => {
      setSaved("idle")
      await persist({ ...metadata, status }, content)
    },
    [metadata, content, persist],
  )

  const onLink = () => {
    const url = window.prompt("Link URL")
    if (url) insertLink(editor, url)
  }

  const onImage = () => {
    const url = window.prompt("Image URL")
    if (url) insertImage(editor, url, "")
  }

  if (!article) {
    return (
      <div className="py-14 text-center">
        <span className="material-symbols-outlined text-[56px] text-outline mb-4" aria-hidden="true">
          article
        </span>
        <h1 className="font-[Space_Grotesk] text-[24px] font-semibold text-on-surface mb-2">
          Article not found
        </h1>
        <p className="text-on-surface-variant">
          No article exists for project "<span className="font-mono">{projectId}</span>".
        </p>
      </div>
    )
  }

  return (
    <div className="flex gap-6 items-start">
      <div className="flex-1 min-w-0 flex flex-col">
        <div className="flex flex-col gap-4 px-6 pb-4 pt-2">
          <input
            value={metadata.title}
            onChange={(e) => applyMetadata({ title: e.target.value })}
            onKeyDown={(e) => {
              if (e.key === "Enter") e.preventDefault()
            }}
            placeholder="Post title"
            className="bg-transparent outline-none text-[32px] font-[Space_Grotesk] font-semibold text-on-surface placeholder:text-on-surface-variant/50 leading-tight"
          />
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => handleSave("Draft")}
              className="px-4 py-2 rounded-lg bg-surface-container-high hover:bg-surface-container text-on-surface font-semibold text-[14px] transition-colors"
            >
              Save Draft
            </button>
            <button
              type="button"
              onClick={() => handleSave("Published")}
              className="px-4 py-2 rounded-lg bg-primary hover:bg-primary/90 text-on-primary font-semibold text-[14px] transition-colors"
            >
              Publish
            </button>
          </div>
        </div>

        <div className="flex-1 min-w-0 flex flex-col rounded-xl overflow-hidden border border-outline-variant/20 bg-surface">
          <div className="relative">
            <Slate
              editor={editor}
              initialValue={content as never}
              onChange={onEditorChange}
            >
              <EditorToolbar onLink={onLink} onImage={onImage} saved={saved} />
              <Editable
                renderElement={renderElement}
                renderLeaf={renderLeaf}
                placeholder="Start writing..."
                className="px-6 py-6 min-h-[50vh] focus:outline-none"
              />
            </Slate>
          </div>
        </div>
      </div>

      <MetadataSidebar metadata={metadata} onChange={applyMetadata} />
    </div>
  )

  function onEditorChange(value: unknown) {
    setContent(value as SlateNode[])
  }
}
