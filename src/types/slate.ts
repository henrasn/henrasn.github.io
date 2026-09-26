export type TextLeaf = {
  text: string
  bold?: boolean
  italic?: boolean
  code?: boolean
}

export type LinkNode = {
  type: "link"
  href: string
  children: TextLeaf[]
}

export type InlineNode = TextLeaf | LinkNode

export type HeadingNode = {
  type: "heading"
  level: 1 | 2
  children: InlineNode[]
}

export type ParagraphNode = {
  type: "paragraph"
  children: InlineNode[]
}

export type QuoteNode = {
  type: "quote"
  children: InlineNode[]
}

export type CodeLineNode = {
  type: "code-line"
  children: TextLeaf[]
}

export type CodeBlockNode = {
  type: "code-block"
  language?: string
  filename?: string
  children: CodeLineNode[]
}

export type ListItemNode = {
  type: "list-item"
  children: InlineNode[]
}

export type BulletedListNode = {
  type: "bulleted-list"
  children: ListItemNode[]
}

export type NumberedListNode = {
  type: "numbered-list"
  children: ListItemNode[]
}

export type CheckItemNode = {
  type: "check-item"
  checked: boolean
  children: InlineNode[]
}

export type CheckListNode = {
  type: "check-list"
  children: CheckItemNode[]
}

export type ImageNode = {
  type: "image"
  src: string
  alt?: string
}

export type SlateBlockNode =
  | HeadingNode
  | ParagraphNode
  | QuoteNode
  | CodeBlockNode
  | BulletedListNode
  | NumberedListNode
  | CheckListNode
  | ImageNode

export type SlateNode = SlateBlockNode
