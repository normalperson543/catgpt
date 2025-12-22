import type { ChatMessage } from "@/lib/types";
import MessageBox from "../message-box";

export default function Chatting({
  messages,
  setMessages,
}: {
  messages: ChatMessage[];
  setMessages: (messages: ChatMessage[]) => void;
}) {
  return (
    <div className="w-1/2 h-full">
      <div className="flex-1 flex flex-col gap-6 overflow-y-auto"></div>
      <div className="flex flex-col gap-2">
        <MessageBox
          onSend={(message) => {
            setMessages([
              ...messages,
              {
                actor: "user",
                message: message,
              },
            ]);
          }}
        />
      </div>
    </div>
  );
}
