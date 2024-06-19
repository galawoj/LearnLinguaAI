import ButtonGenerator from "../../components/ButtonGenerator/ButtonGenerator";

import { TextGenerator } from "../../components/TextGenerator/TextGenerator";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClipboard, faBookOpen } from "@fortawesome/free-solid-svg-icons";
import { faGear, faUser } from "@fortawesome/free-solid-svg-icons";
import styles from "./mainApp.module.scss";

import LanguageLevel from "../../components/LanguageLevel/LanguageLevel";
// import TextTitle from "../../components/TextTitle/TextTitle";
import Dictionary from "../../components/Dictionary/Dictionary";
import TopicTextArea from "../../components/TopicTextArea/TopicTextArea";

export default function MainApp() {
  return (
    <div className={styles.container}>
      <div className={styles.tabs}>
        <input type="radio" name="group" id="home" defaultChecked />
        <input type="radio" name="group" id="dictionary" />
        <input type="radio" name="group" id="setting" />
        <input type="radio" name="group" id="profil" />
        <div className={styles.icon}>
          <label htmlFor="home">
            <FontAwesomeIcon icon={faBookOpen} />
          </label>
          <label htmlFor="dictionary">
            <FontAwesomeIcon icon={faClipboard} />
          </label>
          <label htmlFor="setting">
            <FontAwesomeIcon icon={faGear} />
          </label>
          <label htmlFor="profil">
            <FontAwesomeIcon icon={faUser} />
          </label>
          <div className={styles.indicator}></div>
        </div>
        <div className={styles.content}>
          <div className={styles.contentBx} data-for="home">
            {/* <h2><TextTitle /></h2> */}

            <TextGenerator />
            <ButtonGenerator />
          </div>
          <div className={styles.contentBx} data-for="dictionary">
            <h2>Słownik</h2>

            <Dictionary />
          </div>
          <div className={styles.contentBx} data-for="setting">
            <h2>Preferencje</h2>
            <div>
              <label>Poziom języka</label>
              <LanguageLevel />
              <TopicTextArea />
            </div>
          </div>
          <div className={styles.contentBx} data-for="profil">
            <h2>Profil</h2>
          </div>
        </div>
      </div>
    </div>
  );
}
