import { useAppContext } from "../../store/app-context";
import DictionaryButton from "./DictionaryButton";
import styles from "./dictionary.module.scss";

export default function Dictionary() {
  const { dictionaryList } = useAppContext();

  const listElement = dictionaryList.map((e) => (
    <li key={e.id} className={styles.listElement}>
      <DictionaryButton word={e.word} translatedWord={e.translatedWord} />
    </li>
  ));

  return <ul>{listElement}</ul>;
}
