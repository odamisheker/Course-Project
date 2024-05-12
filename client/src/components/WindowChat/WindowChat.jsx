import { useCallback, useContext, useEffect, useState } from "react";
import { UserContext } from "../context/UserContextProvider";
import Message from "../Message/Message";
import styles from "./WindowChat.module.css";
import ChatToolBar from "../ChatToolBar/ChatToolBar";
import { ChatContext } from "../context/ChatContextProvider";
import { useChat } from "../../hooks/useChat";

export default function WindowChat() {
  const { user } = useContext(UserContext);
  //const { chatID } = useContext(ChatContext);

  //const [messages, setMessages] = useState([]);

  const [message, setMessage] = useState(null);
  const [originalText, setOriginalText] = useState(null);

  const [
    messages,
    users,
    sendMessage,
    editMessage,
    removeMessageForMe,
    removeMessage,
  ] = useChat();

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSend();
    }
  };

  const handleSend = () => {
    //Todo validate message
    setMessage(message.trim());
    if (!message.trim()) return;
    if (message != originalText) {
      editMessage();
    }
    //setMessages((c) => [...c, message.trim()]);
    sendMessage(message);

    setMessage("");
    setOriginalText(null);
  };
  // const { messages } = useChat(chatID);
  // console.log(messages);

  // const handleEdit = (id, content) => {
  //   setMessage(content);
  //   setOriginalText(content);
  // };

  return (
    <div className={styles.main}>
      <div className={styles.wrapper}>
        <ChatToolBar />
        <div className={styles.messages}>
          {messages
            .slice()
            .reverse()
            .map((m, i) => (
              <Message
                key={i}
                data={m}
                onEdit={handleEdit}
                onDeleteForMe={removeMessageForMe}
                onDelete={removeMessage}
              />
            ))}
        </div>
        <div className={styles.input_mes}>
          <input
            placeholder="your message"
            className={styles.input}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyUp={handleKeyPress}
          />
          <button className={styles.send} onClick={handleSend}>
            Send
          </button>
        </div>
      </div>
    </div>
  );
}
