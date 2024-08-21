import { Dispatch, SetStateAction } from "react";
import { type ApiMessageType } from "../types/ApiMessageType";
import { type MessageToDisplayType } from "../types/MessageToDisplayType";
import { type MessageToRequestType } from "../types/MessageToRequestType";
import { type ModelType } from "../types/ModelType";
import { type ApiRequestBodyType } from "../types/ApiRequestBodyType";
import ButtonWord from "../components/ButtonWord/ButtonWord";
import { fetchGptResponse } from "../api/fetchGptResponse";
import { LevelType } from "../types/LevelType";
import { NumberOfTokensType } from "../types/NumberOfTokensType";

type argsType = {
  GPTModel: ModelType;
  chatMessages: MessageToRequestType[];
  setMessagesToRequest: Dispatch<SetStateAction<MessageToRequestType[]>>;
  setMessagesToDisplay: Dispatch<SetStateAction<MessageToDisplayType[]>>;
  setTyping: (typing: boolean) => void;
  languageLevel: LevelType;
  setNumberOfTokens: Dispatch<SetStateAction<NumberOfTokensType>>;
};

export async function processMessageToChatGPT({
  GPTModel,
  chatMessages,
  setMessagesToRequest,
  setMessagesToDisplay,
  setTyping,
  languageLevel,
  setNumberOfTokens,
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
  try {
    const data = await fetchGptResponse(apiRequestBody);
    setNumberOfTokens(() => {
      return {
        input: data.usage.prompt_tokens || 0,
        output: data.usage.completion_tokens || 0,
      };
    });

    const contentGPT: string = data.choices?.[0]?.message?.content || "";
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
  } catch (error) {
    console.log("Error fetching GPT response:", error);
  } finally {
    setTyping(false);
  }
}
