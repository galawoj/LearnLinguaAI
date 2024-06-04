import { useRef, FormEvent } from "react";
import LanguageLevel from "../../components/LanguageLevel/LanguageLevel";
import styles from "./form.module.scss";
import { useAppContext } from "../../store/app-context";
import { TogglePages } from "../../types/TogglePagesType";

type FormProps = {
  onHandleChangePage: (page: TogglePages) => void;
};

export default function Form({ onHandleChangePage }: FormProps) {
  const { handleTextTopic } = useAppContext();
  const textArea = useRef<HTMLTextAreaElement>(null);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    handleTextTopic(textArea.current?.value as string);
    onHandleChangePage("mainApp");
  }

  return (
    <>
      <div className={styles.background}>
        <div className={styles.shape}></div>
        <div className={styles.shape}></div>
      </div>
      <form onSubmit={handleSubmit}>
        <h3>
          <span></span>
        </h3>
        <label>Poziom języka</label>
        <LanguageLevel />

        <label htmlFor="content">Temat</label>

        <textarea
          ref={textArea}
          id="content"
          placeholder="o czym chciałbyś przeczytać tekst w obcym języku?"
        />
        <button>Czas na naukę!</button>
      </form>
    </>
  );
}
