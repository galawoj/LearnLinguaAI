import { useEffect, useState } from "react";
import styles from "./buttonWord.module.scss";
import { type ApiRequestBodyType } from "../../types/ApiRequestBodyType";
import { fetchGptResponse } from "../../api/fetchGptResponse";
import { useAppContext } from "../../store/app-context";

type propsType = {
  word: string;
};

export default function ButtonWord({ word }: propsType) {
  const { GPTModel, translationReset, handleTranslationReset } =
    useAppContext();

  const [buttonText, setButtonText] = useState<string>(word);
  const [textTranslated, setTextTranslated] = useState<string>("");

  useEffect(() => {
    if (translationReset) {
      setButtonText(word);
    }
  }, [translationReset]);

  const apiRequestBody: ApiRequestBodyType = {
    model: GPTModel,
    messages: [
      {
        content: `przetłumacz na język polski słowo '${word}'.Przetłumacz jedno znaczenie, nie rozwijaj tłumaczenia`,
        role: "user",
      },
    ],
  };

  function buttonHandler() {
    if (!textTranslated) {
      fetchGptResponse(apiRequestBody).then((data) => {
        const contentGPT: string = data.choices[0].message.content;
        setTextTranslated(contentGPT);
        setButtonText(contentGPT);
      });
    } else if (textTranslated === buttonText) {
      setButtonText(word);
    } else {
      setButtonText(textTranslated);
    }

    handleTranslationReset(false);
  }

  return (
    <span
      onClick={buttonHandler}
      className={`${styles.button} ${
        textTranslated === buttonText ? styles.clicked : ""
      }`}
    >
      {buttonText}&nbsp;
    </span>
  );
}