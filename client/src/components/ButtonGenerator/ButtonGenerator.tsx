import { useEffect, useState } from "react";
import { useAppContext } from "../../store/app-context";
import styles from "./buttonGenerator.module.scss";

export default function ButtonGenerator() {
  const { typing, isFirstText, generateHandle } = useAppContext();
  const [isFirstRender, setIsFirstRender] = useState<boolean>(true);

  useEffect(() => {
    if (isFirstRender) {
      generateHandle();
      setIsFirstRender(false);
    } else {
      return;
    }
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
