import type { TextLeaf } from "./slate"

type CustomText = TextLeaf

type CustomElement =
  | { type: "paragraph"; children: (CustomText | CustomElement)[] }
  | { type: "heading"; level: 1 | 2; children: (CustomText | CustomElement)[] }
  | { type: "quote"; children: (CustomText | CustomElement)[] }
  | { type: "code-block"; language?: string; filename?: string; children: { type: "code-line"; children: CustomText[] }[] }
  | { type: "code-line"; children: CustomText[] }
  | { type: "bulleted-list"; children: { type: "list-item"; children: (CustomText | CustomElement)[] }[] }
  | { type: "numbered-list"; children: { type: "list-item"; children: (CustomText | CustomElement)[] }[] }
  | { type: "list-item"; children: (CustomText | CustomElement)[] }
  | { type: "check-list"; children: { type: "check-item"; checked: boolean; children: (CustomText | CustomElement)[] }[] }
  | { type: "check-item"; checked: boolean; children: (CustomText | CustomElement)[] }
  | { type: "link"; href: string; children: CustomText[] }
  | { type: "image"; src: string; alt?: string; children: CustomText[] }

declare module "slate" {
  interface CustomTypes {
    Element: CustomElement
    Text: CustomText
  }
}
