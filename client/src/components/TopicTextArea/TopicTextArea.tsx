import { useRef } from "react";
import styles from "./topicTextArea.module.scss";
import { useAppContext } from "../../store/app-context";
import ButtonRandomTopic from "../ButtonRandomTopic/ButtonRandomTopic";

export default function TopicTextArea() {
  const {
    textTopic,
    setTextTopic,
    setIsFirstText,
    setMessagesToRequest,
    setMessagesToDisplay,
  } = useAppContext();
  const textArea = useRef<HTMLTextAreaElement>(null);

  function textAreaChanger() {
    setTextTopic(textArea.current?.value as string);
    setIsFirstText(true);
    setMessagesToRequest([]);
    setMessagesToDisplay([]);
  }
  function onChangeTopicHandler(topic: string) {
    setTextTopic(topic);
    setIsFirstText(true);
    setMessagesToRequest([]);
    setMessagesToDisplay([]);
  }
  return (
    <>
      <label className={styles.label} htmlFor="content">
        Temat
      </label>
      <div style={{ position: "relative" }}>
        <textarea
          onChange={textAreaChanger}
          value={textTopic}
          ref={textArea}
          id="content"
          placeholder="o czym chciałbyś przeczytać tekst w obcym języku?"
        />
        <ButtonRandomTopic onChangeTopicHandler={onChangeTopicHandler} />
      </div>
    </>
  );
}
