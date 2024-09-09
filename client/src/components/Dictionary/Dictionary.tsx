import { useEffect } from "react";
import { useAppContext } from "../../store/app-context";
import DictionaryButton from "./DictionaryButton";
import setInLocalStorage from "../../utils/setInLocalStorage";

import styles from "./dictionary.module.scss";

export default function Dictionary() {
  const { dictionaryList } = useAppContext();

  useEffect(() => {
    setInLocalStorage("dictionary", dictionaryList);
  }, [dictionaryList]);

  const currentListElement = dictionaryList.map((e) => (
    <li key={e.id} className={styles.listElement}>
      <DictionaryButton dictionaryElement={e} />
    </li>
  ));

  return <ul>{currentListElement}</ul>;
}
