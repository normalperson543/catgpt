import type { ChatMessage } from "@/lib/types";
import MessageBox from "../message-box";
import Spinner from "../spinkit/spinner";
import { useState } from "react";
import { dict } from "@/lib/dict";

function generateFakeSentence() {
  let sentence = ""
  let words = 0
  while (Math.random() < 0.8 && words > 2) {
    let word = dict[Math.floor(Math.random() * dict.length - 1)]
    if (words == 0) {
      word = word.substring(0, 1).toUpperCase() + word.substring(1) //makes it uppercase
    }
    const formattingRandomNumber = 
    sentence += word + " "
    words++
  }
  const caseRandomNumber = Math.random()
  if (caseRandomNumber < 0.6) {
    sentence += "."
  } else if (caseRandomNumber < 0.8) {
    sentence += "!"
  } else {
    sentence += "?"
  }
  return sentence
}
async function fakeTypeMessages() {
  // first, generate a random structure
  const maxElements = Math.floor(Math.random() * 10) + 1
  let structure = [];
  for (let i = 0; i < maxElements; i++) {
    const randomElement = Math.random()

    if (randomElement < 0.6) {
        structure.push(generateFakeSentence())
    }

    }
  }
}
export default function Chatting({
  messages,
  setMessages,
}: {
  messages: ChatMessage[];
  setMessages: (messages: ChatMessage[]) => void;
}) {
  const [loading, setLoading] = useState(false)
  return (
    <div className="w-1/2 h-full flex flex-col self-center">
      <div className="flex-1 flex flex-col gap-6 overflow-y-auto h-full">
        {messages.map((message) => message.actor == "user" ? <div className="self-end max-w-1/2 p-3 rounded-md bg-gray-100">{message.message}</div> : <div>{message.message}</div>)}
        {loading && <Spinner />}
      </div>
      <div className="flex flex-col gap-2 w-full">
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
