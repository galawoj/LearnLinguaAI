import ButtonGenerator from "../../components/ButtonGenerator/ButtonGenerator";

import { TextDisplay } from "../../components/TextDisplay/TextDisplay";

import { faClipboard, faBookOpen } from "@fortawesome/free-solid-svg-icons";
import { faGear, faUser } from "@fortawesome/free-solid-svg-icons";
import styles from "./mainApp.module.scss";

import LanguageLevel from "../../components/LanguageLevel/LanguageLevel";
// import TextTitle from "../../components/TextTitle/TextTitle";
import Dictionary from "../../components/Dictionary/Dictionary";
import TopicTextArea from "../../components/TopicTextArea/TopicTextArea";
import TokensCounter from "../../components/TokensCounter/TokensCounter";
import ContentContainer from "./components/ContentContainer";
import Label from "./components/Label";

export default function MainApp() {
  return (
    <div className={styles.container}>
      <div className={styles.tabs}>
        <input type="radio" name="group" id="home" defaultChecked />
        <input type="radio" name="group" id="dictionary" />
        <input type="radio" name="group" id="setting" />
        <input type="radio" name="group" id="profil" />

        <div className={styles.icon}>
          <Label htmlFor={"home"} icon={faBookOpen} />
          <Label htmlFor={"dictionary"} icon={faClipboard} />
          <Label htmlFor={"setting"} icon={faGear} />
          <Label htmlFor={"profil"} icon={faUser} />
          <div className={styles.indicator}></div>
        </div>
        <div className={styles.content}>
          <ContentContainer dataFor={"home"}>
            <TextDisplay />
            <ButtonGenerator />
          </ContentContainer>

          <ContentContainer dataFor={"dictionary"}>
            <h2>Słownik</h2>
            <Dictionary />
          </ContentContainer>

          <ContentContainer dataFor={"setting"}>
            <h2>Preferencje</h2>
            <div>
              <label>Poziom języka</label>
              <LanguageLevel />
              <TopicTextArea />
            </div>
          </ContentContainer>

          <ContentContainer dataFor={"profil"}>
            <h2>Profil</h2>
            <TokensCounter />
          </ContentContainer>
        </div>
      </div>
    </div>
  );
}
