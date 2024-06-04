import { useState } from "react";
import styles from "./dictionary.module.scss";

type propsType = {
  id: string;
  word: string;
  translatedWord: string;
};

export default function DictionaryButton({
  id,
  word,
  translatedWord,
}: propsType) {
  const [isClicked, setIsClicked] = useState<boolean>(false);

  function buttonHandler() {
    setIsClicked(!isClicked);
  }
  return (
    <>
      <button key={id} onClick={buttonHandler} className={styles.button}>
        {!isClicked ? word : translatedWord}
      </button>
    </>
  );
}
