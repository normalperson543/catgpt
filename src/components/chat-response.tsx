import { marked } from "marked";
import { Button } from "./ui/button";
import {
  CheckIcon,
  CopyIcon,
  EllipsisIcon,
  RefreshCwIcon,
  Volume2Icon,
} from "lucide-react";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";
import { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import ShinyText from "./ShinyText";
export default function ChatResponse({
  markdown,
  complete,
  onRegenerate,
  image,
}: {
  markdown: string;
  complete: boolean;
  onRegenerate: () => void;
  image?: string;
}) {
  const [copied, setCopied] = useState(false);
  const renderedMd = marked.parse(markdown, { breaks: true });
  async function acknowledgeCopy() {
    setCopied(true);
    await new Promise((resolve) => setTimeout(resolve, 3000));
    setCopied(false);
  }
  function readAloud() {
    if ("speechSynthesis" in window) {
      const msg = new SpeechSynthesisUtterance();
      msg.text = markdown;
      window.speechSynthesis.speak(msg);
    }
  }
  return (
    <div className="flex flex-col gap-2">
      {!image && (
        <div
          dangerouslySetInnerHTML={{ __html: renderedMd }}
          className="flex flex-col gap-3 leading-7"
        ></div>
      )}
      {complete && image && (
        <div className="flex flex-col gap-3">
          <div className="flex flex-row gap-2">
            <p>Image created</p>
            <p>·</p>
            <p className="text-muted-foreground">{markdown}</p>
          </div>
          <img src={image} width={240} height={240} className="rounded-lg" />
        </div>
      )}
      {!complete && image && (
        <div className="flex flex-col gap-3">
          <div className="flex flex-row gap-2">
            <ShinyText text="Creating image" disabled={false} speed={1} />
            {markdown.length > 0 && (
              <>
                <p>·</p>
                <p className="text-muted-foreground">{markdown}</p>
              </>
            )}
          </div>
          <div className="w-60 h-60 rounded-lg" style={{backgroundImage: `url(${image})`}}> {/* https://stackoverflow.com/questions/20039765/how-to-apply-a-css-filter-to-a-background-image */}
            <div className="relative w-full h-full backdrop-blur-xl block top-0 rounded-lg"></div>
          </div>
        </div>
      )}
      {complete && !image && (
        <div className="flex flex-row gap-1">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                size="icon-sm"
                variant="ghost"
                onClick={() => {
                  navigator.clipboard.writeText(markdown);
                  acknowledgeCopy();
                }}
              >
                {copied ? (
                  <CheckIcon width={12} height={12} />
                ) : (
                  <CopyIcon width={12} height={12} />
                )}
              </Button>
            </TooltipTrigger>
            <TooltipContent className="text-center">
              <p>Copy</p>
            </TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button size="icon-sm" variant="ghost" onClick={onRegenerate}>
                <RefreshCwIcon width={12} height={12} />
              </Button>
            </TooltipTrigger>
            <TooltipContent className="text-center">
              <p>Try again...</p>
              <p className="text-gray-400">Used CatGPT-9.0</p>
            </TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button size="icon-sm" variant="ghost">
                    <EllipsisIcon width={12} height={12} />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start">
                  <DropdownMenuGroup>
                    <DropdownMenuItem onClick={readAloud}>
                      <Volume2Icon width={32} height={32} />
                      <p>Read aloud</p>
                    </DropdownMenuItem>
                  </DropdownMenuGroup>
                </DropdownMenuContent>
              </DropdownMenu>
            </TooltipTrigger>
            <TooltipContent className="text-center">
              <p>More actions</p>
            </TooltipContent>
          </Tooltip>
        </div>
      )}
    </div>
  );
}
