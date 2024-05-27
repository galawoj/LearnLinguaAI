import { createContext, ReactNode, useContext, useState } from "react";

import { type MessageType } from "../types/MessageType";
import { type ModelType } from "../types/ModelType";
import { type MessageToRequestType } from "../types/MessageToRequestType";
import { processMessageToChatGPT } from "../utils/ProcessMessageToChatGPT";

type AppContexType = {
  typing: boolean;
  messages: MessageType[];
  isFirstText: boolean;
  GPTModel: ModelType;
  translationReset: boolean;

  handleChangeModel: (model: ModelType) => void;
  generateHandle: () => void;
  handleTranslationReset: (value: boolean) => void;
};

const AppContext = createContext<AppContexType | null>(null);

type PropsAppContextProvider = {
  children: ReactNode;
};

export function useAppContext() {
  const appCtx = useContext(AppContext);
  if (appCtx === null) {
    throw new Error("TimersContext is null - that should notmbe the case!");
  }

  return appCtx;
}

export function AppContextProvider({ children }: PropsAppContextProvider) {
  const [GPTModel, setGPTModel] = useState<ModelType>("gpt-3.5-turbo");
  const [typing, setTyping] = useState<boolean>(false);
  const [messagesToRequest, setMessagesToRequest] = useState<
    MessageToRequestType[]
  >([]);
  const [messages, setMessages] = useState<MessageType[]>([]);
  const [isFirstText, setIsFirstText] = useState<boolean>(true);
  const [translationReset, setTransaltionReset] = useState<boolean>(false);

  function handleChangeModel(model: ModelType) {
    setGPTModel(model);
  }

  function handleTranslationReset(value: boolean) {
    setTransaltionReset(value);
  }

  const generateHandle = async () => {
    const newMessage: MessageToRequestType = {
      message: isFirstText
        ? "wygeneruj tekst po angielsku na 50 słów na poziomie C1"
        : "kontynułuj poprzedni tekst generując kolejne 50 słów na poziomie C1",
      sender: "user",
      direction: "outgoing",
      position: "normal",
    };

    const newMessagesToRequest: MessageToRequestType[] = [
      ...messagesToRequest,
      newMessage,
    ];

    setMessagesToRequest(newMessagesToRequest);

    setTyping(true);
    await processMessageToChatGPT({
      GPTModel,
      chatMessages: newMessagesToRequest,
      setMessagesToRequest,
      setMessages,
      setTyping,
    });

    setIsFirstText(false);
    setTransaltionReset(true);
  };

  const ctxValue: AppContexType = {
    typing: typing,
    messages: messages,
    isFirstText: isFirstText,
    GPTModel: GPTModel,
    translationReset: translationReset,

    handleChangeModel: handleChangeModel,
    generateHandle: generateHandle,
    handleTranslationReset: handleTranslationReset,
  };
  return <AppContext.Provider value={ctxValue}>{children}</AppContext.Provider>;
}
