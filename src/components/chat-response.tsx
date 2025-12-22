import { marked } from "marked"
export default function ChatResponse({ markdown }: {markdown: string}) {
  const renderedMd = marked.parse(markdown)
  return (
    <div>
      <div dangerouslySetInnerHTML={{ __html: renderedMd }}></div>
    </div>
  )
}