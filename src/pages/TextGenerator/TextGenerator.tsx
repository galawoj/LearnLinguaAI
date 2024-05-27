import SelectModel from "../../components/SelectModel/SelectModel";
import { useAppContext } from "../../store/app-context";
import styles from "./textGenerator.module.scss";

export function TextGenerator() {
  const { messages, typing, isFirstText, generateHandle } = useAppContext();

  const gptMessage = messages.map(({ message, id }) => {
    return (
      <div className={styles.message} key={id}>
        {message}
      </div>
    );
  });

  return (
    <div style={{ position: "relative", height: "100vh", width: "700px" }}>
      <SelectModel />
      {gptMessage}
      {typing ? (
        <span className={styles.loader}></span>
      ) : (
        <button onClick={generateHandle}>
          {isFirstText ? "start" : "continue"}
        </button>
      )}
    </div>
  );
}
