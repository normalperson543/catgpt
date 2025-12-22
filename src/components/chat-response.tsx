import { marked } from "marked";
export default function ChatResponse({ markdown }: { markdown: string }) {
  const renderedMd = marked.parse(markdown);
  return (
    <div
      dangerouslySetInnerHTML={{ __html: renderedMd }}
      className="flex flex-col gap-3 leading-7"
    ></div>
  );
}
