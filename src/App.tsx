import { useState } from "react";
import "@chatscope/chat-ui-kit-styles/dist/default/styles.css";
import "./App.css";

import { type MessageType } from "./types/MessageType";
import { type ModelType } from "./types/ModelType";
import { MessageToRequestType } from "./types/MessageToRequestType";
import SelectModel from "./components/SelectModel/SelectModel";
import { processMessageToChatGPT } from "./utils/ProcessMessageToChatGPT";

function App() {
  const [GPTModel, setGPTModel] = useState<ModelType>("gpt-3.5-turbo");
  const [typing, setTyping] = useState<boolean>(false);
  const [messagesToRequest, setMessagesToRequest] = useState<
    MessageToRequestType[]
  >([]);
  const [messages, setMessages] = useState<MessageType[]>([]);
  const [isFirstText, setIsFirstText] = useState<boolean>(true);

  function handleChangeModel(model: ModelType) {
    setGPTModel(model);
  }

  const generateHandle = async () => {
    const newMessage: MessageToRequestType = {
      message: isFirstText
        ? "wygeneruj tekst po angielsku na 50 słów na poziomie C1"
        : "kontynułuj poprzedni tekst generując kolejne 50 słów na poziomie C1",
      sender: "user",
      direction: "outgoing",
      position: "normal",
    };

    const newMessagesToRequest: MessageToRequestType[] = [
      ...messagesToRequest,
      newMessage,
    ];

    setMessagesToRequest(newMessagesToRequest);

    setTyping(true);
    await processMessageToChatGPT({
      GPTModel,
      chatMessages: newMessagesToRequest,
      setMessagesToRequest,
      setMessages,
      setTyping,
    });

    setIsFirstText(false);
  };

  const textFromGpt = messages.map(({ message, id }) => {
    return <div key={id}>{message}</div>;
  });

  return (
    <>
      <div style={{ position: "relative", height: "100vh", width: "700px" }}>
        <SelectModel onChangeModel={handleChangeModel} />
        {textFromGpt}
        {typing}
        <button onClick={generateHandle}>
          {isFirstText ? "start" : "continue"}
        </button>
      </div>
    </>
  );
}

export default App;
