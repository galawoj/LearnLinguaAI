import styles from "./intro.module.scss";
import TypingText from "../../components/TypingText/TypingText";
import { TogglePages } from "../../types/TogglePagesType";

type IntroProps = {
  onHandleChangePage: (page: TogglePages) => void;
};

export default function Intro({ onHandleChangePage }: IntroProps) {
  return (
    <>
      <div className={styles.card}>
        <h3>Gotowy na podróż językową?</h3>
        <span>
          <TypingText
            text={
              "Zanurz się w naukę języków z pomocą najnowocześniejszej Sztucznej Inteligencji!"
            }
          />
        </span>
        <button onClick={() => onHandleChangePage("form")}>TAK!</button>
      </div>
    </>
  );
}
