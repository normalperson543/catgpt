import { useState } from "react";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupTextarea,
} from "./ui/input-group";
import { ArrowUpIcon, SquareIcon } from "lucide-react";

export default function MessageBox({
  onSend,
  canStop = false,
  onStop,
}: {
  onSend: (message: string) => void;
  canStop?: boolean;
  onStop?: () => void;
}) {
  const [message, setMessage] = useState("");
  return (
    <InputGroup
      className={`rounded-full resize-none shadow-sm shadow-gray-300 p-2 h-3`}
    >
      <InputGroupTextarea
        placeholder="Ask anymeow"
        className="min-h-3 py-0"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        o
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
              onSend(message);
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
