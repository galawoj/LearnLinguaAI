import styles from "../mainApp.module.scss";

type typeProps = {
  dataFor: "home" | "dictionary" | "setting" | "profil";
  children?: React.ReactNode;
};

export default function ({ dataFor, children }: typeProps) {
  return (
    <div className={styles.contentBx} data-for={`${dataFor}`}>
      {children}
    </div>
  );
}
