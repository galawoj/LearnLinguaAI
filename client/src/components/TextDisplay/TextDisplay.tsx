import { useAppContext } from "../../store/app-context";
import ButtonWord from "../ButtonWord/ButtonWord";
import styles from "./textDisplay.module.scss";

export function TextDisplay() {
  const { dialogueWithGpt } = useAppContext();

  const dialogAsButtons = dialogueWithGpt
    .filter((e) => e.role === "assistant")
    .map((e) => {
      const buttons = e.content.split(" ").map((word, i) => {
        return <ButtonWord key={word + i} word={word} id={word + i} />;
      });
      return { content: buttons };
    });

  const gptMessage = dialogAsButtons.map((e, i) => {
    return (
      <div className={styles.message} key={i}>
        &nbsp;&nbsp;&nbsp;{e?.content}
      </div>
    );
  });

  return <div>{gptMessage}</div>;
}
