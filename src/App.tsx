import { useState } from "react";
import "@chatscope/chat-ui-kit-styles/dist/default/styles.css";
import {
  MainContainer,
  ChatContainer,
  MessageList,
  Message,
  MessageInput,
  TypingIndicator,
} from "@chatscope/chat-ui-kit-react";
import "./App.css";

import { type MessageType } from "./types/MessageType";
import { type ModelType } from "./types/ModelType";
import { MessageToRequestType } from "./types/MessageToRequestType";
import SelectModel from "./components/SelectModel";
import { processMessageToChatGPT } from "./utils/ProcessMessageToChatGPT";

function App() {
  const [GPTModel, setGPTModel] = useState<ModelType>("gpt-3.5-turbo");
  const [typing, setTyping] = useState<boolean>(false);
  const [messagesToRequest, setMessagesToRequest] = useState<
    MessageToRequestType[]
  >([]);
  const [messages, setMessages] = useState<MessageType[]>([]);

  function handleChangeModel(model: ModelType) {
    setGPTModel(model);
  }

  const handleSend = async (message: string) => {
    const newMessage: MessageToRequestType = {
      message: message,
      sender: "user",
      direction: "outgoing",
      position: "normal",
    };

    const newMessages: MessageType[] = [...messages, newMessage];
    const newMessagesToRequest: MessageToRequestType[] = [
      ...messagesToRequest,
      newMessage,
    ];

    setMessagesToRequest(newMessagesToRequest);
    setMessages(newMessages);

    setTyping(true);
    await processMessageToChatGPT({
      GPTModel,
      chatMessages: newMessagesToRequest,
      setMessagesToRequest,
      setMessages,
      setTyping,
    });
  };

  return (
    <>
      <div style={{ position: "relative", height: "80vh", width: "700px" }}>
        <SelectModel onChangeModel={handleChangeModel} />
        <MainContainer>
          <ChatContainer>
            <MessageList
              autoScrollToBottom={true}
              scrollBehavior="smooth"
              typingIndicator={
                typing ? <TypingIndicator content="ChatGPT is typing" /> : null
              }
            >
              {messages.map((message, i) => {
                return <div key={i}>{message.message}</div>;
              })}
            </MessageList>
            <MessageInput placeholder="Type message here" onSend={handleSend} />
          </ChatContainer>
        </MainContainer>
      </div>
    </>
  );
}

export default App;
