import type { ChatMessage } from "@/lib/types";
import MessageBox from "../message-box";

export default function Home({
  setChatting,
  messages,
  setMessages,
}: {
  setChatting: () => void;
  messages: ChatMessage[];
  setMessages: (messages: ChatMessage[]) => void;
}) {
  return (
    <div className="h-full w-full p-2 flex items-center justify-center flex-col gap-8 -my-8">
      <h2 className="text-3xl tracking-wide font-light">
        Meow meow purr meow lick?
      </h2>
      <div className="w-1/2">
        <MessageBox
          onSend={(message) => {
            setMessages([
              ...messages,
              {
                actor: "user",
                message: message,
              },
            ]);
            setChatting();
          }}
        />
      </div>
    </div>
  );
}
