import type { ChatMessage } from "@/lib/types";
import MessageBox from "../message-box";
import Spinner from "../spinkit/spinner";
import ChatResponse from "../chat-response";
import { useEffect, useRef } from "react";

export default function Chatting({
  messages,
  loading,
  onSend,
}: {
  messages: ChatMessage[];
  loading: boolean;
  onSend: (message: string) => void;
}) {
  const chatDiv = useRef<HTMLDivElement>(null);

  useEffect(() => {
      if (!chatDiv.current) return;
      chatDiv.current.scrollTo({
        top: chatDiv.current.scrollHeight,
        behavior: "smooth", // remove for instant jump
      });
  }, [messages, loading]);
  return (
    <div className="flex flex-col min-h-screen pt-11 -mt-3">
      <div
        className="flex-1 min-h-0 overflow-y-auto flex flex-col justify-center mb-6"
        ref={chatDiv}
      >
        <div className="w-full h-full flex flex-col self-center max-w-3/5 flex-1 min-h-0">
          <div className="flex-1 flex flex-col gap-6 h-full min-h-0" id="chat">
            {messages.map((message) =>
              message.actor == "user" ? (
                <div className="self-end max-w-1/2 p-3 rounded-md bg-gray-100">
                  {message.message}
                </div>
              ) : (
                <ChatResponse
                  markdown={message.message}
                  complete={message.complete}
                />
              ),
            )}
            {loading && <div className="shrink-0"><Spinner /></div>}
          </div>
        </div>
      </div>
      <div className="w-full pb-6 flex flex-col items-center text-center">
        <div className="w-3/5 flex flex-col gap-2">
          <MessageBox onSend={onSend} />
          <p className="text-muted-foreground text-xs">
            CatGPT is not AI and will make mistakes. Don't bother checking
            important info
          </p>
        </div>
      </div>
    </div>
  );
}
