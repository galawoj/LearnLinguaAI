import { Dispatch, SetStateAction } from "react";
import { type DialogueElementType } from "../types/DialogueElementType";
import { type ModelType } from "../types/ModelType";
import { type ApiRequestBodyType } from "../types/ApiRequestBodyType";
import { fetchGptResponse } from "../api/fetchGptResponse";
import { LevelType } from "../types/LevelType";
import { NumberOfTokensType } from "../types/NumberOfTokensType";

type argsType = {
  GPTModel: ModelType;
  chatMessages: DialogueElementType[];
  setDialogueWithGpt: Dispatch<SetStateAction<DialogueElementType[]>>;
  setTyping: (typing: boolean) => void;
  languageLevel: LevelType;
  setNumberOfTokens: Dispatch<SetStateAction<NumberOfTokensType>>;
};

export async function processDialogueGpt({
  GPTModel,
  chatMessages,
  setDialogueWithGpt,
  setTyping,
  languageLevel,
  setNumberOfTokens,
}: argsType) {
  const systemMessage: DialogueElementType = {
    role: "system",
    content: `generate text only in English at ${languageLevel} level`,
  };

  const apiRequestBody: ApiRequestBodyType = {
    model: GPTModel,
    messages: [systemMessage, ...chatMessages],
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

    const newDialogueElement: DialogueElementType = {
      content: contentGPT,
      role: "assistant",
    };

    const newDialogue: DialogueElementType[] = [
      ...chatMessages,
      newDialogueElement,
    ];
    setDialogueWithGpt(newDialogue);
  } catch (error) {
    console.log("Error fetching GPT response:", error);
  } finally {
    setTyping(false);
  }
}
