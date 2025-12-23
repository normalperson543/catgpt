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
export default function ChatResponse({
  markdown,
  complete,
  onRegenerate,
}: {
  markdown: string;
  complete: boolean;
  onRegenerate: () => void;
}) {
  const [copied, setCopied] = useState(false);
  const renderedMd = marked.parse(markdown, { breaks: true });
  async function acknowledgeCopy() {
    setCopied(true);
    await new Promise((resolve) => setTimeout(resolve, 3000));
    setCopied(false);
  }
  function readAloud() {
    if ('speechSynthesis' in window) {
      const msg = new SpeechSynthesisUtterance();
      msg.text = markdown;
      window.speechSynthesis.speak(msg);
    }
  }
  return (
    <div className="flex flex-col gap-2">
      <div
        dangerouslySetInnerHTML={{ __html: renderedMd }}
        className="flex flex-col gap-3 leading-7"
      ></div>
      {complete && (
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
            <TooltipTrigger>
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
