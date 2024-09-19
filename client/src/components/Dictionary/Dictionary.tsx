import { useEffect } from "react";
import { useAppContext } from "../../store/app-context";
import DictionaryItem from "./DictionaryItem";
import setInLocalStorage from "../../utils/setInLocalStorage";

export default function Dictionary() {
  const { dictionaryList } = useAppContext();

  useEffect(() => {
    setInLocalStorage("dictionary", dictionaryList);
  }, [dictionaryList]);

  const currentListElement = dictionaryList.map((e) => (
    <DictionaryItem dictionaryElement={e} key={e.id}>
      <DictionaryItem.RemoveButton />
    </DictionaryItem>
  ));

  return <ul>{currentListElement}</ul>;
}
