import { useRef } from "react";
import styles from "./topicTextArea.module.scss";
import { useAppContext } from "../../store/app-context";

export default function TopicTextArea() {
  const {
    textTopic,
    setTextTopic,
    setIsFirstText,
    setMessagesToRequest,
    setMessages,
  } = useAppContext();
  const textArea = useRef<HTMLTextAreaElement>(null);

  function textAreaChanger() {
    setTextTopic(textArea.current?.value as string);
    setIsFirstText(true);
    setMessagesToRequest([]);
    setMessages([]);
  }

  return (
    <>
      <label className={styles.label} htmlFor="content">
        Temat
      </label>
      <textarea
        onChange={textAreaChanger}
        value={textTopic}
        ref={textArea}
        id="content"
        placeholder="o czym chciałbyś przeczytać tekst w obcym języku?"
      />
    </>
  );
}
