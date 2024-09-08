import styles from "./BackgroundShapes.module.scss";

export default function BackgroundShapes() {
  return (
    <div className={styles.background}>
      <div className={styles.shape}></div>
      <div className={styles.shape}></div>
    </div>
  );
}
