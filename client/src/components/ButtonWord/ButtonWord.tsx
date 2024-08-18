import { useEffect, useState } from "react";
import styles from "./buttonWord.module.scss";
import { type ApiRequestBodyType } from "../../types/ApiRequestBodyType";
import { fetchGptResponse } from "../../api/fetchGptResponse";
import { useAppContext } from "../../store/app-context";

type propsType = {
  word: string;
  id: string;
};

export default function ButtonWord({ word, id }: propsType) {
  const {
    GPTModel,
    translationReset,
    setTransaltionReset,
    dictionaryAddElement,
    setNumberOfTokens,
  } = useAppContext();

  const [buttonText, setButtonText] = useState<string>(word);
  const [textTranslated, setTextTranslated] = useState<string>("");
  const [isFirstRender, setIsFirstRender] = useState<boolean>(true);

  useEffect(() => {
    if (translationReset) {
      setButtonText(word);
    }
  }, [translationReset]);

  useEffect(() => {
    if (isFirstRender) {
      setIsFirstRender(false);
      return;
    } else {
      const reg = /[.,]/g;
      const onlyWordToLowerCase = word.replace(reg, "").toLowerCase();
      const onlyContentGPTToLowerCase = textTranslated
        .replace(reg, "")
        .toLowerCase();

      dictionaryAddElement({
        word: onlyWordToLowerCase,
        translatedWord: onlyContentGPTToLowerCase,
        id: id,
      });
    }
  }, [textTranslated]);

  const apiRequestBody: ApiRequestBodyType = {
    model: GPTModel,
    messages: [
      {
        content: "your response is only ONE world in polish language",
        role: "system",
      },
      {
        content: `przetłumacz na język polski słowo '${word}'`,
        role: "user",
      },
    ],
  };

  function buttonHandler() {
    if (!textTranslated) {
      fetchGptResponse(apiRequestBody).then((data) => {
        setNumberOfTokens(() => {
          return {
            input: data.usage.prompt_tokens,
            output: data.usage.completion_tokens,
          };
        });

        const contentGPT: string = data.choices[0].message.content;
        setTextTranslated(contentGPT);
        setButtonText(contentGPT);
      });
    } else if (textTranslated === buttonText) {
      setButtonText(word);
    } else {
      setButtonText(textTranslated);
    }

    setTransaltionReset(false);
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
