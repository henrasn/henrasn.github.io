import { createLowlight } from "lowlight"
import kotlin from "highlight.js/lib/languages/kotlin"
import javascript from "highlight.js/lib/languages/javascript"
import xml from "highlight.js/lib/languages/xml"
import yaml from "highlight.js/lib/languages/yaml"

export const lowlight = createLowlight()
lowlight.register("kotlin", kotlin)
lowlight.register("kt", kotlin)
lowlight.register("javascript", javascript)
lowlight.register("xml", xml)
lowlight.register("yaml", yaml)