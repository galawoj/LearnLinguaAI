import { useAppContext } from "../../store/app-context";
import { type ApiRequestBodyType } from "../../types/ApiRequestBodyType";
import { type ApiMessageType } from "../../types/ApiMessageType";
import { fetchGptResponse } from "../../api/fetchGptResponse";
import styles from "./buttonRandomTopic.module.scss";
import { useState } from "react";

type propsType = {
  onChangeTopicHandler: (topic: string) => void;
};

export default function ButtonRandomTopic({ onChangeTopicHandler }: propsType) {
  const { GPTModel, languageLevel } = useAppContext();

  const [isTyping, setIsTyping] = useState<boolean>(false);

  //   const [randomTopic, setRandomTopic] = useState<string>("");
  const systemMessage: ApiMessageType = {
    role: "system",
    content: `generate text only in Polish`,
  };

  function randomTopicHandler() {
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

    fetchGptResponse(apiRequestBody)
      .then((data) => {
        const reg = /^"|"$/g;

        const contentGPT: string = data.choices[0].message.content;
        onChangeTopicHandler(contentGPT.replace(reg, ""));
      })
      .then(() => setIsTyping(false));
  }

  return (
    <button
      type="button"
      style={{
        position: "absolute",
        bottom: "10px",
        right: "10px",
        maxWidth: "30%",
        height: "30%",
        fontSize: "8pt",
        padding: 0,
        opacity: 0.5,
      }}
      onClick={randomTopicHandler}
    >
      {!isTyping ? "losuj temat" : <span className={styles.loader}></span>}
    </button>
  );
}
