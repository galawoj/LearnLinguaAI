import { useState } from "react";
import styles from "./dictionary.module.scss";

type propsType = {
  word: string;
  translatedWord: string;
};

export default function DictionaryButton({ word, translatedWord }: propsType) {
  const [isClicked, setIsClicked] = useState<boolean>(false);

  function buttonHandler() {
    setIsClicked(!isClicked);
  }
  return (
    <>
      <button
        onClick={buttonHandler}
        className={`${styles.button} ${isClicked && styles.buttonClicked} `}
      >
        {!isClicked ? word : translatedWord}
      </button>
    </>
  );
}
