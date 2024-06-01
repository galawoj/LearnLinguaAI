import LanguageLevel from "../../components/LanguageLevel/LanguageLevel";
import styles from "./form.module.scss";

export default function Form() {
  return (
    <>
      <div className={styles.background}>
        <div className={styles.shape}></div>
        <div className={styles.shape}></div>
      </div>
      <form>
        <h3>
          <span></span>
        </h3>
        <label>Poziom języka</label>
        <LanguageLevel />

        <label htmlFor="content">Temat</label>

        <textarea
          id="content"
          placeholder="o czym chciałbyś przeczytać tekst w obcym języku?"
        />
        <button>Czas na naukę!</button>
      </form>
    </>
  );
}
