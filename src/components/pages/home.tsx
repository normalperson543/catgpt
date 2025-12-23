import { generateFakeSentence } from "@/lib/chat-api";
import MessageBox from "../message-box";

export default function Home({
  onChat,
}: {
  onChat: (message: string, generateImage: boolean) => void;
}) {
  const fakeQuestion = generateFakeSentence(true, false)
  return (
    <div className="h-full w-full p-2 flex items-center justify-center flex-col gap-8 -my-8">
      <h2 className="text-3xl tracking-wide font-light">
        {fakeQuestion + "?"}
      </h2>
      <div className="w-1/2">
        <MessageBox
          onSend={(message, generateImage) => {
            onChat(message, generateImage);
          }}
        />
      </div>
    </div>
  );
}
