import { useAppContext } from "../../store/app-context";

import style from "./dictionary.module.scss";
import { useDictionaryItemContext } from "./DictionaryItem";

export default function RemoveItemButton() {
  const { dictionaryElement } = useDictionaryItemContext();

  const { dictionaryRemoveElement } = useAppContext();

  return (
    <button
      className={style.removeButton}
      onClick={() => dictionaryRemoveElement(dictionaryElement)}
    >
      X
    </button>
  );
}
