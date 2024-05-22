import { useState } from "react";
import styles from "./buttonWord.module.scss";
import { type ApiRequestBodyType } from "../../types/apiRequestBodyType";
import { ModelType } from "../../types/ModelType";
import { fetchGptResponse } from "../../api/fetchGptResponse";

type propsType = {
  word: string;
  GPTModel: ModelType;
};

export default function ButtonWord({ word, GPTModel }: propsType) {
  const [buttonText, setButtonText] = useState<string>(word);
  const [textTranslated, setTextTranslated] = useState<string>("");

  const apiRequestBody: ApiRequestBodyType = {
    model: GPTModel,
    messages: [
      {
        content: `przetłumacz na język polski słowo '${word}'. Wygeneruj tylko jedno znaczenie, "nie rozwijaj tlumaczenia, tylko wygeneruj to tłumaczenie`,
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
  }

  return (
    <button onClick={buttonHandler} className={styles.button}>
      {buttonText}&nbsp;
    </button>
  );
}
