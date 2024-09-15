import { useState, createContext, useContext } from "react";
import styles from "./dictionary.module.scss";
import RemoveItemButton from "./RemoveItemButton.tsx";
import { DictionaryElement } from "../../types/DisctionaryElementType";

type propsDictionaryItemType = {
  dictionaryElement: DictionaryElement;
  children: React.ReactNode;
};

type DictionaryCtxType = {
  dictionaryElement: DictionaryElement;
};

const DictionaryCtx = createContext<DictionaryCtxType | null>(null);

export function useDictionaryItemContext() {
  const dictionaryCtx = useContext(DictionaryCtx);
  if (dictionaryCtx === null) {
    throw new Error("DictionaryCtx is null - that should notmbe the case!");
  }

  return dictionaryCtx;
}

export default function DictionaryItem({
  dictionaryElement,
  children,
}: propsDictionaryItemType) {
  const [isClicked, setIsClicked] = useState<boolean>(false);

  function buttonHandler() {
    setIsClicked(!isClicked);
  }

  const ctx: DictionaryCtxType = {
    dictionaryElement: dictionaryElement,
  };

  return (
    <DictionaryCtx.Provider value={ctx}>
      <li key={dictionaryElement.id} className={styles.listElement}>
        <button
          onClick={buttonHandler}
          className={`${styles.button} ${isClicked && styles.buttonClicked} `}
        >
          {!isClicked
            ? dictionaryElement.word
            : dictionaryElement.translatedWord}
        </button>
        {children}
      </li>
    </DictionaryCtx.Provider>
  );
}

DictionaryItem.RemoveButton = RemoveItemButton;
