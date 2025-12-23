import { dict, emojiDict } from "./dict";
import type { CatImageResp, ChatMessage, Token } from "./types";

export function generateFakeSentence(partial: boolean = false) {
  let sentence = "";
  let words = 0;

  while (!(Math.random() < 0.8 && words > 2)) {
    const wordIndex = Math.floor(Math.random() * dict.length);
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
    if (words === 0) {
      sentence = word;
    } else {
      sentence += " " + word;
    }
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
  if (!partial) {
    const caseRandomNumber = Math.random();
    if (caseRandomNumber < 0.6) {
      sentence += ". ";
    } else if (caseRandomNumber < 0.8) {
      sentence += "! ";
    } else {
      sentence += "? ";
    }
  }
  console.log(sentence);
  return sentence;
}
export async function fakeTypeMessages(
  initMessages: ChatMessage[],
  setMessages: (messages: ChatMessage[]) => void,
  setLoading: (newState: boolean) => void,
  token: Token,
) {
  console.log("starting");
  setLoading(true);
  let messages = initMessages;
  console.log(messages);

  function onCancel() {
    if (messages[messages.length - 1].actor === "user") return;
    messages = messages.map((message, i) => {
      if (i === messages.length - 1) {
        return {
          ...message,
          complete: true,
        };
      } else {
        return message;
      }
    });
    setMessages(messages);
  }

  // first, generate a random structure
  const maxElements = Math.floor(Math.random() * 50) + 1;
  const structure = [];
  for (let i = 0; i < maxElements; i++) {
    const randomElement = Math.random();
    if (randomElement < 0.8) {
      structure.push(generateFakeSentence());
    } else if (randomElement < 0.85) {
      if (structure[structure.length - 1] != "\n") {
        structure.push("\n");
      }
    } else if (randomElement < 0.9) {
      let sentence = generateFakeSentence();
      const emojiRandomChance = Math.random();
      if (emojiRandomChance < 0.7) {
        sentence =
          emojiDict[Math.floor(Math.random() * emojiDict.length)] +
          " " +
          sentence;
      }
      structure.push("\n" + sentence + "\n");
    } else if (randomElement < 0.95) {
      // bullet point time
      const bullets = Math.floor(Math.random() * 6) + 2;
      structure.push("\n");
      for (let i = 0; i < bullets; i++) {
        structure.push("* " + generateFakeSentence(true) + "\n");
      }
      structure.push("\n");
    } else {
      // new heading
      let sentence = generateFakeSentence(true);
      const emojiRandomChance = Math.random();
      if (emojiRandomChance < 0.7) {
        sentence =
          emojiDict[Math.floor(Math.random() * emojiDict.length)] +
          " " +
          sentence;
      }
      structure.push("\n## " + sentence + "\n");
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
  if (token.isCancelled) {
    onCancel();
    return;
  }
  setLoading(false);
  messages = [...messages, { actor: "ai", message: "", complete: false }];
  setMessages(messages);
  for (let i = 0; i < markdown.length; i += Math.floor(Math.random() * 4) + 1) {
    if (token.isCancelled) {
      onCancel();
      return;
    }
    const partialMessage = markdown.substring(0, i);
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
    console.log(partialMessage);
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
        complete: true,
      };
    } else {
      return message;
    }
  });
  setMessages(messages);
}
export async function fakeGenerateImage(
  setImageUrl: (url: string) => void,
  setGenerating: (newState: boolean) => void,
  initMessages: ChatMessage[],
  setMessages: (messages: ChatMessage[]) => void,
  setLoading: (newState: boolean) => void,
  token: Token,
) {
  let messages = initMessages;

  function onCancel() {
    if (messages[messages.length - 1].actor === "user") return;
    messages = messages.map((message, i) => {
      if (i === messages.length - 1) {
        return {
          ...message,
          complete: true,
        };
      } else {
        return message;
      }
    });
    setMessages(messages);
  }

  const fakeSentence = generateFakeSentence();
  setLoading(true);
  const randomCat: CatImageResp = (
    await fetch("https://cataas.com/cat?json=true")
  ).json;

  await new Promise((resolve) =>
    setTimeout(resolve, Math.floor(Math.random() * 2000) + 500),
  );
  setLoading(false);
  setGenerating(true);
  await new Promise((resolve) =>
    setTimeout(resolve, Math.floor(Math.random() * 10000) + 3000),
  );
  setGenerating(false);
  messages = [...messages, { actor: "ai", message: "", complete: false }];
  setMessages(messages);
  const markdown = fakeSentence;
  for (let i = 0; i < markdown.length; i += Math.floor(Math.random() * 4) + 1) {
    if (token.isCancelled) {
      onCancel();
      return;
    }
    const partialMessage = markdown.substring(0, i);
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
    console.log(partialMessage);
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
        complete: true,
      };
    } else {
      return message;
    }
  });
  setImageUrl(randomCat.url);
  setMessages(messages);
}
