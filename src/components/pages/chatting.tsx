import type { ChatMessage } from "@/lib/types";
import MessageBox from "../message-box";
import Spinner from "../spinkit/spinner";
import ChatResponse from "../chat-response";

export default function Chatting({
  messages,
  loading,
  onSend,
}: {
  messages: ChatMessage[];
  loading: boolean;
  onSend: (message: string) => void
}) {
  return (
    <div className="w-1/2 h-full flex flex-col self-center">
      <div className="flex-1 flex flex-col gap-6 overflow-y-auto h-full" id="chat">
        {messages.map((message) =>
          message.actor == "user" ? (
            <div className="self-end max-w-1/2 p-3 rounded-md bg-gray-100">
              {message.message}
            </div>
          ) : (
            <ChatResponse markdown={message.message} />
          ),
        )}
        {loading && <Spinner />}
      </div>
      <div className="flex flex-col gap-2 w-full">
        <MessageBox
          onSend={onSend}
        />
      </div>
    </div>
  );
}
