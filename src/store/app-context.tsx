import { createContext, ReactNode, useContext, useState } from "react";

import { type MessageType } from "../types/MessageType";
import { type ModelType } from "../types/ModelType";
import { type MessageToRequestType } from "../types/MessageToRequestType";
import { type DictionaryElement } from "../types/DisctionaryElementType";
import { processMessageToChatGPT } from "../utils/ProcessMessageToChatGPT";
import { LevelType } from "../types/LevelType";

type AppContexType = {
  typing: boolean;
  messages: MessageType[];
  messagesToRequest: MessageToRequestType[];
  isFirstText: boolean;
  GPTModel: ModelType;
  languageLevel: LevelType;
  translationReset: boolean;
  textTopic: string;
  dictionaryList: DictionaryElement[];

  handleChangeModel: (model: ModelType) => void;
  handleChangeLevel: (level: LevelType) => void;
  generateHandle: () => void;
  handleTranslationReset: (value: boolean) => void;
  handleTextTopic: (text: string) => void;
  dictionaryAddElement: (element: DictionaryElement) => void;
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
  const [languageLevel, setLanguageLevel] = useState<LevelType>(
    "B2 Upper intermediate"
  );
  const [GPTModel, setGPTModel] = useState<ModelType>("gpt-3.5-turbo");
  const [typing, setTyping] = useState<boolean>(false);
  const [messagesToRequest, setMessagesToRequest] = useState<
    MessageToRequestType[]
  >([]);
  const [messages, setMessages] = useState<MessageType[]>([]);
  const [isFirstText, setIsFirstText] = useState<boolean>(true);
  const [translationReset, setTransaltionReset] = useState<boolean>(false);
  const [textTopic, setTextTopic] = useState<string>("");
  const [dictionaryList, setDictionaryList] = useState<DictionaryElement[]>([]);

  function handleChangeModel(model: ModelType) {
    setGPTModel(model);
  }

  function handleChangeLevel(level: LevelType) {
    setLanguageLevel(level);
  }

  function handleTranslationReset(value: boolean) {
    setTransaltionReset(value);
  }

  function handleTextTopic(text: string) {
    setTextTopic(text);
  }

  function dictionaryAddElement(element: DictionaryElement) {
    if (dictionaryList.some((item) => item.word === element.word)) {
      return;
    }

    setDictionaryList((dictionary) => {
      const updatedDictionary = [...dictionary, element];
      return updatedDictionary;
    });
  }

  const generateHandle = async () => {
    const newMessage: MessageToRequestType = {
      message: isFirstText
        ? `generate a 50-word English text at ${languageLevel} level on the topic ${textTopic}`
        : `Continue the previous text by generating another 50 words at ${languageLevel} level`,
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
    messagesToRequest: messagesToRequest,
    isFirstText: isFirstText,
    GPTModel: GPTModel,
    languageLevel: languageLevel,
    translationReset: translationReset,
    textTopic: textTopic,
    dictionaryList: dictionaryList,

    handleChangeModel: handleChangeModel,
    handleChangeLevel: handleChangeLevel,
    generateHandle: generateHandle,
    handleTranslationReset: handleTranslationReset,
    handleTextTopic: handleTextTopic,
    dictionaryAddElement: dictionaryAddElement,
  };
  return <AppContext.Provider value={ctxValue}>{children}</AppContext.Provider>;
}
