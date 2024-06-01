import styles from "./intro.module.scss";
import TypingText from "../../components/TypingText/TypingText";

export default function Intro() {
  return (
    <>
      <div className={styles.background}>
        <div className={styles.shape}></div>
        <div className={styles.shape}></div>
      </div>
      <div className={styles.card}>
        <h3>Gotowy na podróż językową?</h3>
        <span>
          <TypingText
            text={
              "Zanurz się w naukę języków z pomocą najnowocześniejszej Sztucznej Inteligencji!"
            }
          />
        </span>
        <button>ok</button>
      </div>
    </>
  );
}
