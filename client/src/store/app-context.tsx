import { createContext, ReactNode, useContext, useState } from "react";

import { type DialogueElementType } from "../types/DialogueElementType";
import { type ModelType } from "../types/ModelType";

import { type DictionaryElement } from "../types/DictionaryElementType";
import { type NumberOfTokensType } from "../types/NumberOfTokensType";

import { LevelType } from "../types/LevelType";
import randomElementsFromArray from "../utils/randomElementsFromArray";
import getFromLocalStorage from "../utils/getFromLocalStorage";
import { processDialogueGpt } from "../utils/processDialogueGpt";

type AppContexType = {
  typing: boolean;
  dialogueWithGpt: DialogueElementType[];
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
  setDialogueWithGpt: (message: DialogueElementType[]) => void;
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
  const [dialogueWithGpt, setDialogueWithGpt] = useState<DialogueElementType[]>(
    []
  );

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

    const newDialogueElement: DialogueElementType = {
      content: isFirstText
        ? `generate a 50-word text on the topic: '${textTopic}',${wordsToAttach} `
        : `Continue the previous text by generating another 50 words, ${wordsToAttach}`,
      role: "user",
    };
    const newDialogue: DialogueElementType[] = [
      ...dialogueWithGpt,
      newDialogueElement,
    ];

    setDialogueWithGpt(newDialogue);
    setTyping(true);

    await processDialogueGpt({
      GPTModel,
      chatMessages: newDialogue,
      setDialogueWithGpt,
      setTyping,
      languageLevel,
      setNumberOfTokens,
    });

    setIsFirstText(false);
    setTransaltionReset(true);
  };

  const ctxValue: AppContexType = {
    typing: typing,

    dialogueWithGpt: dialogueWithGpt,
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
    setDialogueWithGpt: setDialogueWithGpt,

    setNumberOfTokens: setNumberOfTokens,
  };
  return <AppContext.Provider value={ctxValue}>{children}</AppContext.Provider>;
}
