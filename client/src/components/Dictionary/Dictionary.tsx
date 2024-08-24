import { useEffect, useState } from "react";
import { useAppContext } from "../../store/app-context";
import DictionaryButton from "./DictionaryButton";
import setArrayInLocalStorage from "../../utils/setArrayInLocalStorage";
import getArrayFromLocalStorage from "../../utils/getArrayFromLocalStorage";
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
        getArrayFromLocalStorage("dictionary");

      setCurrentDictionaryList(dictionaryListFromStorage);

      for (let listElement of dictionaryListFromStorage) {
        dictionaryAddElement(listElement);
      }
      setIsFirstRender(false);
    } else {
      setCurrentDictionaryList(dictionaryList);
      setArrayInLocalStorage("dictionary", dictionaryList);
      console.log(1);
    }
  }, [dictionaryList]);

  const currentListElement = currentDictionaryList.map((e) => (
    <li key={e.id} className={styles.listElement}>
      <DictionaryButton word={e.word} translatedWord={e.translatedWord} />
    </li>
  ));

  return <ul>{currentListElement}</ul>;
}
