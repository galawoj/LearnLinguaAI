import { Dispatch, SetStateAction } from "react";
import { type ApiMessageType } from "../types/ApiMessageType";
import { type MessageType } from "../types/MessageType";
import { type MessageToRequestType } from "../types/MessageToRequestType";
import { type ModelType } from "../types/ModelType";
import { type ApiRequestBodyType } from "../types/ApiRequestBodyType";
import ButtonWord from "../components/ButtonWord/ButtonWord";
import { fetchGptResponse } from "../api/fetchGptResponse";
import { NumberOfTokensType } from "../types/NumberOfTokensType";

type propsType = {
  GPTModel: ModelType;
  chatMessages: MessageToRequestType[];
  setMessagesToRequest: Dispatch<SetStateAction<MessageToRequestType[]>>;
  setMessages: Dispatch<SetStateAction<MessageType[]>>;
  setTyping: (typing: boolean) => void;
  setNumberOfTokens: Dispatch<SetStateAction<NumberOfTokensType>>;
};

export async function processMessageToChatGPT({
  GPTModel,
  chatMessages,
  setMessagesToRequest,
  setMessages,
  setTyping,
  setNumberOfTokens,
}: propsType) {
  let apiMessages: ApiMessageType[] = chatMessages.map((messageObject) => {
    let role: "assistant" | "user" | "" = "";
    if (messageObject.sender === "ChatGPT") {
      role = "assistant";
    } else {
      role = "user";
    }
    return { role: role, content: messageObject.message };
  });

  // const systemMessage: ApiMessageType = {
  //   role: "system",
  //   content: "odpowiadaj zawsze po polsku",
  // };

  const apiRequestBody: ApiRequestBodyType = {
    model: GPTModel,
    messages: [...apiMessages],
    //messages: [systemMessage,...apiMessages]
  };

  fetchGptResponse(apiRequestBody).then((data) => {
    setNumberOfTokens(() => {
      return {
        input: data.usage.prompt_tokens,
        output: data.usage.completion_tokens,
      };
    });

    const contentGPT: string = data.choices[0].message.content;
    const messageAsButtons = contentGPT.split(" ").map((word, i) => {
      return <ButtonWord key={word + i} word={word} id={word + i} />;
    });

    setMessages((messages) => {
      const gptMessage: MessageType = {
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
