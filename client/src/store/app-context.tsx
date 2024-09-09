import { createContext, ReactNode, useContext, useState } from "react";

import { type MessageToDisplayType } from "../types/MessageToDisplayType";
import { type ModelType } from "../types/ModelType";
import { type MessageToRequestType } from "../types/MessageToRequestType";
import { type DictionaryElement } from "../types/DisctionaryElementType";
import { type NumberOfTokensType } from "../types/NumberOfTokensType";
import { processMessageToChatGPT } from "../utils/ProcessMessageToChatGPT";
import { LevelType } from "../types/LevelType";
import randomElementsFromArray from "../utils/randomElementsFromArray";
import getFromLocalStorage from "../utils/getFromLocalStorage";

type AppContexType = {
  typing: boolean;
  messagesToDisplay: MessageToDisplayType[];
  messagesToRequest: MessageToRequestType[];
  isFirstText: boolean;
  GPTModel: ModelType;
  languageLevel: LevelType;
  translationReset: boolean;
  textTopic: string;
  dictionaryList: DictionaryElement[];
  numberOfTokens: NumberOfTokensType;

  setIsFirstText: (value: boolean) => void;
  setGPTModel: (model: ModelType) => void;
  setLanguageLevel: (level: LevelType) => void;
  generateHandle: () => void;
  setTransaltionReset: (value: boolean) => void;
  setTextTopic: (text: string) => void;
  dictionaryAddElement: (element: DictionaryElement) => void;
  dictionaryRemoveElement: (element: DictionaryElement) => void;

  setMessagesToRequest: (message: MessageToRequestType[]) => void;
  setMessagesToDisplay: (message: MessageToDisplayType[]) => void;
  setNumberOfTokens: React.Dispatch<React.SetStateAction<NumberOfTokensType>>;
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
  const [messagesToDisplay, setMessagesToDisplay] = useState<
    MessageToDisplayType[]
  >([]);
  const [isFirstText, setIsFirstText] = useState<boolean>(true);
  const [translationReset, setTransaltionReset] = useState<boolean>(false);
  const [textTopic, setTextTopic] = useState<string>("");
  const [dictionaryList, setDictionaryList] = useState<DictionaryElement[]>([]);
  const [numberOfTokens, setNumberOfTokens] = useState<NumberOfTokensType>({
    input: 0,
    output: 0,
  });

  function dictionaryAddElement(element: DictionaryElement) {
    if (dictionaryList.some((item) => item.word === element.word)) {
      return;
    }

    setDictionaryList((dictionary) => {
      const updatedDictionary = [...dictionary, element];
      return updatedDictionary;
    });
  }

  function dictionaryRemoveElement(element: DictionaryElement) {
    setDictionaryList((dictionary) => {
      const updatedDictionary = dictionary.filter(
        (dictionaryElement) => dictionaryElement.id !== element.id
      );

      return updatedDictionary;
    });
  }

  const generateHandle = async () => {
    const dictionaryListFromStorage: DictionaryElement[] =
      getFromLocalStorage("dictionary");

    dictionaryListFromStorage?.map(dictionaryAddElement);

    const wordList =
      (isFirstText ? dictionaryListFromStorage : dictionaryList) ?? [];

    const wordsToAttach =
      wordList.length > 0
        ? `use words: ${randomElementsFromArray(wordList, 5).map((e) => {
            return e.word;
          })}`
        : wordList;

    const newMessage: MessageToRequestType = {
      message: isFirstText
        ? `generate a 50-word text on the topic: '${textTopic}',${wordsToAttach} `
        : `Continue the previous text by generating another 50 words, ${wordsToAttach}`,
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
      setMessagesToDisplay,
      setTyping,
      languageLevel,
      setNumberOfTokens,
    });

    setIsFirstText(false);
    setTransaltionReset(true);
  };

  const ctxValue: AppContexType = {
    typing: typing,
    messagesToDisplay: messagesToDisplay,
    messagesToRequest: messagesToRequest,
    isFirstText: isFirstText,
    GPTModel: GPTModel,
    languageLevel: languageLevel,
    translationReset: translationReset,
    textTopic: textTopic,
    dictionaryList: dictionaryList,
    numberOfTokens: numberOfTokens,

    setIsFirstText: setIsFirstText,
    setGPTModel: setGPTModel,
    setLanguageLevel: setLanguageLevel,
    generateHandle: generateHandle,
    setTransaltionReset: setTransaltionReset,
    setTextTopic: setTextTopic,
    dictionaryAddElement: dictionaryAddElement,
    dictionaryRemoveElement: dictionaryRemoveElement,
    setMessagesToRequest: setMessagesToRequest,
    setMessagesToDisplay: setMessagesToDisplay,
    setNumberOfTokens: setNumberOfTokens,
  };
  return <AppContext.Provider value={ctxValue}>{children}</AppContext.Provider>;
}
