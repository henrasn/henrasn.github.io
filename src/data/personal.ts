import { getProject } from "./projects"

export type PersonalAccent = "teal" | "coral" | "blue" | "red"

export type ChipVariant = "primary" | "secondary" | "tertiary" | "rust" | "neutral" | "neutralVariant"

export type PersonalThumbnail =
  | { kind: "gradient"; height: 40 | 48 | 56 | 64; from: string; via?: string; to: string; icon?: string; wave?: boolean }
  | { kind: "image"; height: 40 | 48 | 56 | 64; src: string; blend?: boolean }
  | { kind: "typographic"; height: 40 | 48 | 56 | 64; text: string }

export type PersonalProject = {
  id: string
  title: string
  description: string
  categories: string[]
  accent: PersonalAccent
  clamp?: boolean
  links: { icon: string; href: string }[]
  chips: { label: string; variant: ChipVariant }[]
  thumbnail: PersonalThumbnail
}

const composeIt = getProject("compose-it")

export const personalProjects: PersonalProject[] = [
  {
    id: composeIt?.id ?? "compose-it",
    title: composeIt?.title ?? "Compose-It",
    description:
      "A declarative UI toolkit extension library for Android. Adds complex animations and layout modifiers missing from the standard library. Featured in Android Weekly.",
    categories: ["android", "oss"],
    accent: "teal",
    clamp: true,
    links: [
      { icon: "code", href: "#" },
      { icon: "open_in_new", href: "#" },
    ],
    chips: [
      { label: "Kotlin", variant: "primary" },
      { label: "Jetpack Compose", variant: "secondary" },
    ],
    thumbnail: {
      kind: "gradient",
      height: 48,
      from: "#12c2e9",
      via: "#c471ed",
      to: "#f64f59",
      icon: "rocket_launch",
    },
  },
  {
    id: "neural-net-visualizer",
    title: "Neural Net Visualizer",
    description:
      "WebGL-powered interactive visualization of a lightweight neural network training in real-time in the browser. Watch the weights adjust as it learns basic logic gates.",
    categories: ["web", "experiments"],
    accent: "coral",
    clamp: true,
    links: [{ icon: "play_circle", href: "#" }],
    chips: [
      { label: "Three.js", variant: "tertiary" },
      { label: "TypeScript", variant: "primary" },
    ],
    thumbnail: {
      kind: "image",
      height: 64,
      src: "https://lh3.googleusercontent.com/aida-public/AB6AXuAIkCYDoZXZtQQhvRz13TPvpEkTa4SB1HKUJFFvetDODVsuMMeZAiABHZ4Lp1R4c2FeoqUoogK6rdiD0wzGy3HY-Dc2MLyDlRFyzJo6Z-LLt6t_4sqlzpVddhHrbk_c9kw0tAcXAYtIZiVT4Me5LdelInM1860tCL9qLZXT4MQZpLZY4wuMsR9yhMxHKNCAA4e3gIKYum1UI72kfwjvJpZq_P_jw_55yMkXe88apHKZLHCI70i6Z4TzgQ",
      blend: true,
    },
  },
  {
    id: "rusty-api",
    title: "Rusty API",
    description:
      "A blazingly fast, type-safe API gateway built in Rust. Handles rate limiting, JWT authentication, and request routing with less than 5ms overhead.",
    categories: ["oss", "web"],
    accent: "blue",
    links: [{ icon: "code", href: "#" }],
    chips: [
      { label: "Rust", variant: "rust" },
      { label: "Actix", variant: "neutral" },
    ],
    thumbnail: {
      kind: "gradient",
      height: 40,
      from: "#4A00E0",
      to: "#8E2DE2",
      wave: true,
    },
  },
  {
    id: "homehub-kmp",
    title: "HomeHub KMP",
    description:
      "An experimental smart home controller app built with Kotlin Multiplatform. Shares 90% of code between Android and a local Raspberry Pi backend server.",
    categories: ["experiments", "android"],
    accent: "teal",
    links: [
      { icon: "code", href: "#" },
      { icon: "phone_iphone", href: "#" },
    ],
    chips: [
      { label: "KMP", variant: "primary" },
      { label: "Ktor", variant: "secondary" },
    ],
    thumbnail: {
      kind: "image",
      height: 56,
      src: "https://lh3.googleusercontent.com/aida-public/AB6AXuBorF_4-eLk_IL3dRIHhEkQBBBs1MQNABqnQZHqTx4-MkZAivP7K2MOOpMkHsxaijjyHqiSYgeWz3FHP2Vsy_YMNbsB6Xj3sNJIoRQWsEKV0hoLM6Pdk1-jXHNsUEz93V3qC-rosLu-1gXvSdRml7OIyuta9IPDhSFSEQjf7OhHHLMqOCGBDCnXWJkcrb1e7NN0-1EAnraLoCNujPYP-o962d7p2CsKHXRvios3rmiilhyCW08lUxlwtA",
    },
  },
  {
    id: "glitch-art-generator",
    title: "Glitch Art Generator",
    description:
      "A purely functional approach to corrupting image headers and pixel data to generate aesthetic glitch art. Because sometimes breaking things is the point.",
    categories: ["experiments"],
    accent: "red",
    links: [{ icon: "brush", href: "#" }],
    chips: [
      { label: "Haskell", variant: "neutralVariant" },
      { label: "CLI", variant: "neutralVariant" },
    ],
    thumbnail: { kind: "typographic", height: 48, text: "GLITCH" },
  },
]

export const listPersonalProjects = () => personalProjects