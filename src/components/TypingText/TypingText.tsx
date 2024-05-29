import { useEffect, useState } from "react";

type PropsTypingText = {
  text: string;
};

export default function TypingText({ text }: PropsTypingText) {
  const [generateText, setGenerateText] = useState("");
  useEffect(() => {
    const interval = setInterval(() => {
      setGenerateText((prevText) => {
        if (prevText.length < text.length) {
          return prevText + text[prevText.length];
        } else {
          clearInterval(interval);
          return prevText;
        }
      });
    }, 40);

    return () => clearInterval(interval); // Cleanup interval on component unmount
  }, [text]);

  return <>{generateText}</>;
}
