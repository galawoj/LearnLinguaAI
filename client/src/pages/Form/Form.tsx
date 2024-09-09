import { useRef, FormEvent } from "react";
import LanguageLevel from "../../components/LanguageLevel/LanguageLevel";
import styles from "./form.module.scss";
import { useAppContext } from "../../store/app-context";
import { TogglePages } from "../../types/TogglePagesType";
import ButtonRandomTopic from "../../components/ButtonRandomTopic/ButtonRandomTopic";

type FormProps = {
  onHandleChangePage: (page: TogglePages) => void;
};

export default function Form({ onHandleChangePage }: FormProps) {
  const { setTextTopic } = useAppContext();
  const textArea = useRef<HTMLTextAreaElement>(null);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setTextTopic(textArea.current?.value as string);
    onHandleChangePage("mainApp");
  }

  function onChangeTopicHandler(topic: string) {
    textArea.current!.value = topic;
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <label>Poziom języka</label>
        <LanguageLevel />
        <label htmlFor="content">Temat</label>
        <div style={{ position: "relative" }}>
          <textarea
            className={styles.textarea}
            ref={textArea}
            id="content"
            placeholder="o czym chciałbyś przeczytać tekst w obcym języku?"
          />
          <ButtonRandomTopic onChangeTopicHandler={onChangeTopicHandler} />
        </div>

        <button type="submit">Czas na naukę!</button>
      </form>
    </>
  );
}
