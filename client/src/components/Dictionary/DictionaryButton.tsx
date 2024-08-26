import { useState } from "react";
import styles from "./dictionary.module.scss";
import RemoveButton from "./RemoveButton";
import { DictionaryElement } from "../../types/DisctionaryElementType";

export default function DictionaryButton({
  dictionaryElement,
}: {
  dictionaryElement: DictionaryElement;
}) {
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
        {!isClicked ? dictionaryElement.word : dictionaryElement.translatedWord}
      </button>
      <RemoveButton removingElement={dictionaryElement} />
    </>
  );
}
