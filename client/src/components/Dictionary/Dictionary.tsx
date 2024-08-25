import { useEffect, useState } from "react";
import { useAppContext } from "../../store/app-context";
import DictionaryButton from "./DictionaryButton";
import setInLocalStorage from "../../utils/setInLocalStorage";
import getFromLocalStorage from "../../utils/getFromLocalStorage";
import { DictionaryElement } from "../../types/DisctionaryElementType";
import styles from "./dictionary.module.scss";

export default function Dictionary() {
  const { dictionaryList, dictionaryAddElement } = useAppContext();

  const [currentDictionaryList, setCurrentDictionaryList] = useState<
    DictionaryElement[]
  >([]);

  const [isFirstRender, setIsFirstRender] = useState<boolean>(true);

  useEffect(() => {
    if (isFirstRender) {
      const dictionaryListFromStorage: DictionaryElement[] =
        getFromLocalStorage("dictionary");
      if (dictionaryListFromStorage) {
        setCurrentDictionaryList(dictionaryListFromStorage);

        for (let listElement of dictionaryListFromStorage) {
          dictionaryAddElement(listElement);
        }
      }

      setIsFirstRender(false);
    } else {
      setCurrentDictionaryList(dictionaryList);
      setInLocalStorage("dictionary", dictionaryList);
    }
  }, [dictionaryList]);

  const currentListElement = currentDictionaryList.map((e) => (
    <li key={e.id} className={styles.listElement}>
      <DictionaryButton word={e.word} translatedWord={e.translatedWord} />
    </li>
  ));

  return <ul>{currentListElement}</ul>;
}
