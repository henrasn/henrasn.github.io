import { writeFileSync, mkdirSync } from "node:fs"
import { dirname, join } from "node:path"
import type { ServerResponse } from "node:http"
import type { Connect } from "vite"
import type { Plugin } from "vite"

type ExperienceRecord = {
  id: string
  role: string
  company: string
  [key: string]: unknown
}

const isExperienceArray = (value: unknown): value is ExperienceRecord[] =>
  Array.isArray(value) &&
  value.every(
    (item) =>
      typeof item === "object" &&
      item !== null &&
      typeof (item as ExperienceRecord).id === "string" &&
      typeof (item as ExperienceRecord).role === "string" &&
      typeof (item as ExperienceRecord).company === "string",
  )

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === "object" && value !== null

const isSlateNode = (value: unknown): boolean =>
  isRecord(value) &&
  typeof value.type === "string" &&
  Array.isArray(value.children)

const parseJsonBody = (
  req: Connect.IncomingMessage,
  res: ServerResponse,
  cb: (parsed: unknown) => void,
) => {
  let body = ""
  req.on("data", (chunk: Buffer) => {
    body += chunk.toString()
  })
  req.on("end", () => {
    try {
      cb(JSON.parse(body))
    } catch {
      res.statusCode = 400
      res.end(JSON.stringify({ ok: false, error: "Invalid JSON body" }))
    }
  })
}

const sendJson = (
  res: ServerResponse,
  status: number,
  payload: Record<string, unknown>,
) => {
  res.statusCode = status
  res.setHeader("Content-Type", "application/json")
  res.end(JSON.stringify(payload))
}

export function adminSavePlugin(): Plugin {
  return {
    name: "admin-save",
    apply: "serve",
    configureServer(server) {
      server.middlewares.use("/__admin/experience", (req, res) => {
        if (req.method !== "POST") {
          sendJson(res, 405, { ok: false, error: "Method not allowed" })
          return
        }

        parseJsonBody(req, res, (parsed) => {
          if (!isExperienceArray(parsed)) {
            sendJson(res, 400, {
              ok: false,
              error: "Body must be an array of experience records",
            })
            return
          }

          const root = server.config.root || process.cwd()
          const file = join(root, "src", "data", "content", "experience.json")
          writeJson(file, parsed, res)
        })
      })

      server.middlewares.use("/__admin/articles/", (req, res) => {
        if (req.method !== "POST") {
          sendJson(res, 405, { ok: false, error: "Method not allowed" })
          return
        }

        if (!req.url) {
          sendJson(res, 400, { ok: false, error: "Missing url" })
          return
        }
        const rawId = decodeURIComponent(req.url.split("?")[0].replace(/^\/+/, ""))
        const safeId = rawId
        if (!/^[a-z0-9][a-z0-9-_]*$/i.test(safeId)) {
          sendJson(res, 400, { ok: false, error: "Invalid project id" })
          return
        }

        parseJsonBody(req, res, (parsed) => {
          const data = parsed as {
            metadata?: unknown
            content?: unknown
          }
          if (
            !isRecord(data) ||
            !isRecord(data.metadata) ||
            !Array.isArray(data.content) ||
            !data.content.every(isSlateNode)
          ) {
            sendJson(res, 400, {
              ok: false,
              error: "Body must be { metadata, content } with content as a Slate node array",
            })
            return
          }

          const root = server.config.root || process.cwd()
          const file = join(root, "src", "data", "content", "articles", `${safeId}.json`)
          writeJson(file, data, res)
        })
      })
    },
  }
}

function writeJson(file: string, value: unknown, res: ServerResponse) {
  try {
    const pretty = JSON.stringify(value, null, 2) + "\n"
    mkdirSync(dirname(file), { recursive: true })
    writeFileSync(file, pretty, "utf8")
    sendJson(res, 200, { ok: true, file })
  } catch (err) {
    sendJson(res, 500, {
      ok: false,
      error: err instanceof Error ? err.message : "Unknown error",
    })
  }
}
