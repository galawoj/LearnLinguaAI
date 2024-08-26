import { useAppContext } from "../../store/app-context";
import { DictionaryElement } from "../../types/DisctionaryElementType";
import style from "./dictionary.module.scss";

export default function RemoveButton({
  removingElement,
}: {
  removingElement: DictionaryElement;
}) {
  const { dictionaryRemoveElement } = useAppContext();

  return (
    <button
      className={style.removeButton}
      onClick={() => dictionaryRemoveElement(removingElement)}
    >
      X
    </button>
  );
}
