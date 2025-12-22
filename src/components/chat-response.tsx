import { marked } from "marked";
export default function ChatResponse({ markdown }: { markdown: string }) {
  const renderedMd = marked.parse(markdown, {breaks: true});
  return (
    <div
      dangerouslySetInnerHTML={{ __html: renderedMd }}
      className="flex flex-col gap-3 leading-7"
    ></div>
  );
}
