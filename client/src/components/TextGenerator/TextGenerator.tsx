import { useAppContext } from "../../store/app-context";
import styles from "./textGenerator.module.scss";

export function TextGenerator() {
  const { messagesToDisplay } = useAppContext();

  const gptMessage = messagesToDisplay.map(({ message, id }) => {
    return (
      <div className={styles.message} key={id}>
        &nbsp;&nbsp;&nbsp;{message}
      </div>
    );
  });

  return <div>{gptMessage}</div>;
}
