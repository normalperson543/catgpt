import { useState } from "react";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupTextarea,
} from "./ui/input-group";
import { ArrowUpIcon } from "lucide-react";

export default function MessageBox({
  onSend,
}: {
  onSend: (message: string) => void;
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
      />
      <InputGroupAddon align="inline-end">
        <InputGroupButton
          size="icon-sm"
          className="rounded-full"
          variant="default"
          onClick={() => {
            onSend(message);
            setMessage("");
          }}
        >
          <ArrowUpIcon width={24} height={24} />
        </InputGroupButton>
      </InputGroupAddon>
    </InputGroup>
  );
}
