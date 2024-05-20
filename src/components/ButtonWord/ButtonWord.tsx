import { useState } from "react";
import styles from "./buttonWord.module.scss";

type propsType = {
  word: string;
};

export default function ButtonWord({ word }: propsType) {
  const [buttonText, setButtonText] = useState<string>(`${word}`);

  function mouseDownHandle() {
    setButtonText("dupa");
  }
  function mouseUpHandle() {
    setButtonText(`${word}`);
  }

  return (
    <button
      onMouseDown={mouseDownHandle}
      onMouseUp={mouseUpHandle}
      className={styles.button}
    >
      {buttonText}&nbsp;
    </button>
  );
}
