import type { ChatMessage } from "@/lib/types";
import MessageBox from "../message-box";
import Spinner from "../spinkit/spinner";
import { useState } from "react";
import { dict, emojiDict } from "@/lib/dict";
import ChatResponse from "../chat-response";

function generateFakeSentence(partial: boolean = false) {
  let sentence = "";
  let words = 0;

  while (Math.random() < 0.8 && words > 2) {
    let word = dict[Math.floor(Math.random() * dict.length - 1)];
    if (words == 0) {
      word = word.substring(0, 1).toUpperCase() + word.substring(1); //makes it uppercase
    }
    const formattingRandomNumber = Math.random();
    if (formattingRandomNumber < 0.1) {
      // bold
      word = "**" + word + "**";
    }
    sentence += word + " ";
    words++;
  }
  const formattingRandomNumber = Math.random();
  if (formattingRandomNumber < 0.05) {
    // bold the entire sentence!!
    sentence = "**" + sentence + "**";
  } else if (formattingRandomNumber < 0.1) {
    //italicize the entire sentence
    sentence = "*" + sentence + "*";
  }
  const caseRandomNumber = Math.random();
  if (caseRandomNumber < 0.6) {
    if (!partial) {
      sentence += ". ";
    }
  } else if (caseRandomNumber < 0.8) {
    sentence += "! ";
  } else {
    sentence += "? ";
  }
  return sentence;
}
async function fakeTypeMessages(
  messages: ChatMessage[],
  setMessages: (messages: ChatMessage[]) => void,
  setLoading: (newState: boolean) => void,
) {
  console.log("starting")
  setLoading(true);
  // first, generate a random structure
  const maxElements = Math.floor(Math.random() * 10) + 1;
  const structure = [];
  for (let i = 0; i < maxElements; i++) {
    const randomElement = Math.random();
    if (randomElement < 0.6) {
      structure.push(generateFakeSentence());
    } else if (randomElement < 0.8) {
      if (structure[structure.length - 1] != "\n") {
        structure.push("\n");
      }
    } else if (randomElement < 0.9) {
      let sentence = generateFakeSentence(true);
      const emojiRandomChance = Math.random();
      if (emojiRandomChance < 0.7) {
        sentence =
          emojiDict[Math.floor(Math.random() * (emojiDict.length - 1))] +
          sentence;
      }
      structure.push("\n" + sentence + "\n");
    } else if (randomElement < 0.95) {
      // bullet point time
      const bullets = Math.floor(Math.random() * 6) + 2;
      for (let i = 0; i < bullets; i++) {
        structure.push("* " + generateFakeSentence(true));
      }
    } else {
      // new heading
      let sentence = generateFakeSentence(true);
      const emojiRandomChance = Math.random();
      if (emojiRandomChance < 0.7) {
        sentence =
          emojiDict[Math.floor(Math.random() * (emojiDict.length - 1))] +
          sentence;
      }
      structure.push(" ## " + sentence);
    }
    console.log("b")
  }
  const markdown = structure.join("");
  console.log(markdown)
  await new Promise((resolve) =>
    setTimeout(resolve, Math.floor(Math.random() * 5000) + 500),
  );
  setMessages([...messages, { actor: "ai", message: "" }]);
  for (let i = 0; i < markdown.length; i += Math.floor(Math.random() * 4) + 1) {
    setMessages(
      messages.map((message, i) => {
        if (i === messages.length - 1) {
          return {
            ...message,
            message: markdown.substring(0, i),
          };
        } else {
          return message;
        }
      }),
    );
    await new Promise((resolve) =>
      setTimeout(resolve, Math.floor(Math.random() * 100) + 50),
    );
  }
  setMessages(
    messages.map((message, i) => {
      if (i === messages.length - 1) {
        return {
          ...message,
          message: markdown,
        };
      } else {
        return message;
      }
    }),
  );
  setLoading(false);
}
export default function Chatting({
  messages,
  setMessages,
}: {
  messages: ChatMessage[];
  setMessages: (messages: ChatMessage[]) => void;
}) {
  const [loading, setLoading] = useState(false);
  return (
    <div className="w-1/2 h-full flex flex-col self-center">
      <div className="flex-1 flex flex-col gap-6 overflow-y-auto h-full">
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
          onSend={async (message) => {
            setMessages([
              ...messages,
              {
                actor: "user",
                message: message,
              },
            ]);
            await fakeTypeMessages(messages, setMessages, setLoading);
          }}
        />
      </div>
    </div>
  );
}
