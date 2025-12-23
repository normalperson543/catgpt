import { useState, type KeyboardEvent } from "react";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupTextarea,
} from "./ui/input-group";
import { ArrowUpIcon, ImagesIcon, PlusIcon, SquareIcon } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

export default function MessageBox({
  onSend,
  canStop = false,
  onStop,
}: {
  onSend: (message: string, generateImage: boolean) => void;
  canStop?: boolean;
  onStop?: () => void;
}) {
  const [message, setMessage] = useState("");

  function handleKeyDown(e: KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      onSend(message, false);
      setMessage("");
    }
  }
  return (
    <InputGroup
      className={`rounded-full resize-none shadow-sm shadow-gray-300 p-2 h-3`}
    >
      <InputGroupAddon align="inline-start">
        {message.length > 0 ? (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <InputGroupButton
                size="icon-sm"
                className="rounded-full"
                variant="ghost"
              >
                <PlusIcon width={24} height={24} />
              </InputGroupButton>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start">
              <DropdownMenuGroup>
                <DropdownMenuItem
                  asChild
                  onClick={() => {
                    onSend(message, true);
                    setMessage("");
                  }}
                >
                  <a href="#">
                    <ImagesIcon />
                    Create image
                  </a>
                </DropdownMenuItem>
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <InputGroupButton
            size="icon-sm"
            className="rounded-full"
            variant="ghost"
            disabled
          >
            <PlusIcon width={24} height={24} />
          </InputGroupButton>
        )}
      </InputGroupAddon>
      <InputGroupTextarea
        placeholder="Ask anymeow"
        className="min-h-3 py-0"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyDown={handleKeyDown}
      />
      <InputGroupAddon align="inline-end">
        {canStop ? (
          <InputGroupButton
            size="icon-sm"
            className="rounded-full"
            variant="default"
            onClick={() => {
              if (onStop) onStop();
            }}
          >
            <SquareIcon width={24} height={24} />
          </InputGroupButton>
        ) : (
          <InputGroupButton
            size="icon-sm"
            className="rounded-full"
            variant="default"
            onClick={() => {
              onSend(message, false);
              setMessage("");
            }}
            disabled={message.length == 0}
          >
            <ArrowUpIcon width={24} height={24} />
          </InputGroupButton>
        )}
      </InputGroupAddon>
    </InputGroup>
  );
}
