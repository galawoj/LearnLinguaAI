import { Dispatch, SetStateAction } from "react";
import { type ApiMessageType } from "../types/ApiMessageType";
import { type MessageToDisplayType } from "../types/MessageToDisplayType";
import { type MessageToRequestType } from "../types/MessageToRequestType";
import { type ModelType } from "../types/ModelType";
import { type ApiRequestBodyType } from "../types/ApiRequestBodyType";
import ButtonWord from "../components/ButtonWord/ButtonWord";
import { fetchGptResponse } from "../api/fetchGptResponse";
import { LevelType } from "../types/LevelType";

type argsType = {
  GPTModel: ModelType;
  chatMessages: MessageToRequestType[];
  setMessagesToRequest: Dispatch<SetStateAction<MessageToRequestType[]>>;
  setMessagesToDisplay: Dispatch<SetStateAction<MessageToDisplayType[]>>;
  setTyping: (typing: boolean) => void;
  languageLevel: LevelType;
};

export async function processMessageToChatGPT({
  GPTModel,
  chatMessages,
  setMessagesToRequest,
  setMessagesToDisplay,
  setTyping,
  languageLevel,
}: argsType) {
  let apiMessages: ApiMessageType[] = chatMessages.map((messageObject) => {
    let role: "assistant" | "user" | "" = "";
    if (messageObject.sender === "ChatGPT") {
      role = "assistant";
    } else {
      role = "user";
    }
    return { role: role, content: messageObject.message };
  });

  const systemMessage: ApiMessageType = {
    role: "system",
    content: `generate text only in English at ${languageLevel} level`,
  };

  const apiRequestBody: ApiRequestBodyType = {
    model: GPTModel,
    // messages: [...apiMessages],
    messages: [systemMessage, ...apiMessages],
  };

  fetchGptResponse(apiRequestBody).then((data) => {
    const contentGPT: string = data.choices[0].message.content;
    const messageAsButtons = contentGPT.split(" ").map((word, i) => {
      return <ButtonWord key={word + i} word={word} id={word + i} />;
    });

    setMessagesToDisplay((messages) => {
      const gptMessage: MessageToDisplayType = {
        id: data.id,
        message: messageAsButtons,
        sender: "ChatGPT",
        direction: "incoming",
        position: "normal",
      };
      const newMessages = [...messages, gptMessage];
      return newMessages;
    });

    setMessagesToRequest((messages) => {
      const gptMessage: MessageToRequestType = {
        message: contentGPT,
        sender: "ChatGPT",
        direction: "incoming",
        position: "normal",
      };
      const newMessages = [...messages, gptMessage];
      return newMessages;
    });
    setTyping(false);
  });
}

// Here are some helpful rules of thumb for understanding tokens in terms of lengths:
// 1 token ~= 4 chars in English
// 1 token ~= ¾ words
// 100 tokens ~= 75 words
// Or
// 1-2 sentence ~= 30 tokens
// 1 paragraph ~= 100 tokens
// 1,500 words ~= 2048 tokens
// To get additional context on how tokens stack up, consider this:
// Wayne Gretzky’s quote "You miss 100% of the shots you don't take" contains 11 tokens.
// OpenAI’s charter contains 476 tokens.
// The transcript of the US Declaration of Independence contains 1,695 tokens.

// GPT-4o New
// Our fastest and most affordable flagship model
//  Text and image input, text output
//  128k context length
//  Input: $5 | Output: $15*

// GPT-4 Turbo
// Our previous high-intelligence model
//  Text and image input, text output
//  128k context length
//  Input: $10 | Output: $30*

// GPT-3.5 Turbo
// Our fast, inexpensive model for simple tasks
//  Text input, text output
//  16k context length
//  Input: $0.50 | Output: $1.50*

// * prices per 1 million tokens
