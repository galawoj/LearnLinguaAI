import { useAppContext } from "../../store/app-context";
import { type ApiRequestBodyType } from "../../types/ApiRequestBodyType";
import { type DialogueElementType } from "../../types/DialogueElementType";
import { fetchGptResponse } from "../../api/fetchGptResponse";
import styles from "./buttonRandomTopic.module.scss";
import { useState } from "react";

type propsType = {
  onChangeTopicHandler: (topic: string) => void;
};

export default function ButtonRandomTopic({ onChangeTopicHandler }: propsType) {
  const { GPTModel, languageLevel, setNumberOfTokens } = useAppContext();

  const [isTyping, setIsTyping] = useState<boolean>(false);

  const systemMessage: DialogueElementType = {
    role: "system",
    content: `generate text only in Polish`,
  };

  async function randomTopicHandler() {
    setIsTyping(true);
    const apiRequestBody: ApiRequestBodyType = {
      model: GPTModel,
      messages: [
        systemMessage,
        {
          content: `Wygeneruj losowy, ciekawy temat tekstu do nauki języka obcego na poziomie ${languageLevel}`,
          role: "user",
        },
      ],
    };

    const data = await fetchGptResponse(apiRequestBody);
    const reg = /^"|"$/g;

    const contentGPT: string = data.choices?.[0]?.message?.content || "";
    onChangeTopicHandler(contentGPT.replace(reg, ""));
    setNumberOfTokens(() => {
      return {
        input: data.usage.prompt_tokens || 0,
        output: data.usage.completion_tokens || 0,
      };
    });

    setIsTyping(false);
  }

  return (
    <button
      className={styles.buttonRandomTopic}
      type="button"
      onClick={randomTopicHandler}
    >
      {!isTyping ? "losuj temat" : <span className={styles.loader}></span>}
    </button>
  );
}
