import { marked } from "marked";
import { Button } from "./ui/button";
import { CopyIcon, EllipsisIcon, RefreshCwIcon } from "lucide-react";
export default function ChatResponse({
  markdown,
  complete,
}: {
  markdown: string;
  complete: boolean;
}) {
  const renderedMd = marked.parse(markdown, { breaks: true });
  return (
    <div className="flex flex-col gap-2">
      <div
        dangerouslySetInnerHTML={{ __html: renderedMd }}
        className="flex flex-col gap-3 leading-7"
      ></div>
      {complete && (
        <div className="flex flex-row gap-1">
          <Button size="icon-sm" variant="ghost">
            <CopyIcon width={12} height={12} />
          </Button>
          <Button size="icon-sm" variant="ghost">
            <RefreshCwIcon width={12} height={12} />
          </Button>
          <Button size="icon-sm" variant="ghost">
            <EllipsisIcon width={12} height={12} />
          </Button>
        </div>
      )}
    </div>
  );
}
