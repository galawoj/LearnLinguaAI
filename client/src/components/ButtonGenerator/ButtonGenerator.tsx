import { useEffect } from "react";
import { useAppContext } from "../../store/app-context";
import styles from "./buttonGenerator.module.scss";

export default function ButtonGenerator() {
  const { typing, isFirstText, generateHandle } = useAppContext();

  useEffect(() => {
    generateHandle();
  }, []);

  return (
    <>
      {typing ? (
        <span className={styles.loader}></span>
      ) : (
        <button
          style={{ outline: "none", border: "none" }}
          onClick={generateHandle}
        >
          {isFirstText ? "start" : "continue"}
        </button>
      )}
    </>
  );
}
