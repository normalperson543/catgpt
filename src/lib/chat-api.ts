import { dict, emojiDict } from "./dict";
import type { ChatMessage } from "./types";

function generateFakeSentence(partial: boolean = false) {
  let sentence = "";
  let words = 0;

  while (!(Math.random() < 0.8 && words > 2)) {
    const wordIndex = Math.floor(Math.random() * (dict.length - 1));
    let word = dict[wordIndex];
    if (words == 0) {
      console.log(wordIndex);
      word = word.substring(0, 1).toUpperCase() + word.substring(1); //makes it uppercase
    }
    const formattingRandomNumber = Math.random();
    if (formattingRandomNumber < 0.1) {
      // bold
      word = "**" + word + "**";
    }
    sentence += " " + word;
    words++;
  }
  const formattingRandomNumber = Math.random();
  if (formattingRandomNumber < 0.05) {
    // bold the entire sentence!!
    sentence = "**" + sentence + "**";
  } else if (formattingRandomNumber < 0.1) {
    //italicize the entire sentence
    sentence = "_" + sentence + "_";
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
  console.log(sentence);
  return sentence;
}
export async function fakeTypeMessages(
  initMessages: ChatMessage[],
  setMessages: (messages: ChatMessage[]) => void,
  setLoading: (newState: boolean) => void,
) {
  console.log("starting");
  setLoading(true);
  let messages = initMessages;
  console.log(messages)
  // first, generate a random structure
  const maxElements = Math.floor(Math.random() * 50) + 1;
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
      structure.push("\n")
      for (let i = 0; i < bullets; i++) {
        structure.push("* " + generateFakeSentence(true) + "\n");
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
      structure.push("\n## " + sentence);
    }
    console.log("b");
  }
  console.log("structure");
  console.log(structure);
  const markdown = structure.join("");
  console.log("markdown");
  console.log(markdown);
  await new Promise((resolve) =>
    setTimeout(resolve, Math.floor(Math.random() * 5000) + 500),
  );
  setLoading(false);
  messages = [...messages, { actor: "ai", message: "" }]
  setMessages(messages);
  for (let i = 0; i < markdown.length; i += Math.floor(Math.random() * 4) + 1) {
    const partialMessage = markdown.substring(0, i)
    messages = messages.map((message, i) => {
      if (i === messages.length - 1) {
        return {
          ...message,
          message: partialMessage,
        };
      } else {
        return message;
      }
    });
    setMessages(messages);
    console.log(partialMessage)
    console.log(messages);
    await new Promise((resolve) =>
      setTimeout(resolve, Math.floor(Math.random() * 50) + 10),
    );
  }
  messages = messages.map((message, i) => {
    if (i === messages.length - 1) {
      return {
        ...message,
        message: markdown,
      };
    } else {
      return message;
    }
  });
  setMessages(messages);
}
