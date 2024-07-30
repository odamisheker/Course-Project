import { useCallback, useContext, useEffect, useState } from "react";
import { UserContext } from "../context/UserContextProvider";
import Message from "../Message/Message";
import styles from "./WindowChat.module.css";
import ChatToolBar from "../ChatToolBar/ChatToolBar";
import { ChatContext } from "../context/ChatContextProvider";
import { useChat } from "../../hooks/useChat";
import { CTR } from "../../algorithms/AES/CTR";
import { Counter } from "../../algorithms/AES/utils/counter";
import Cookies from "js-cookie";

export default function WindowChat() {
  const { user } = useContext(UserContext);
  const {
    chat: { chatID },
  } = useContext(ChatContext);
  //console.log(user);
  //const [messages, setMessages] = useState([]);

  const [message, setMessage] = useState("");

  const [
    messages,
    // users,
    sendMessage,
    // editMessage,
    removeMessageForMe,
    removeMessage,
  ] = useChat(chatID);

  const encoder = new TextEncoder();

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSend();
    }
  };

  const handleSend = () => {
    //Todo validate message
    //setMessage(message.trim());
    if (!message.trim()) return;

    const AESkey = Cookies.get("AESkey");
    console.log(AESkey);
    let textBytes = encoder.encode(message);
    let encryptedBytes = new Uint8Array(textBytes.length);

    let aesCTR = new CTR(AESkey, new Counter(0));

    aesCTR.encrypt(textBytes, encryptedBytes);

    console.log("message", message);
    let encrMessage = encryptedBytes;
    console.log("encr", encrMessage);
    let str = encrMessage.toString();
    //setMessages((c) => [...c, message.trim()]);
    sendMessage(str, user);

    setMessage("");

    // getMessage(str);
  };
  // const { messages } = useChat(chatID);
  // console.log(messages);

  return (
    <div className={styles.main}>
      <div className={styles.wrapper}>
        <ChatToolBar />
        <div className={styles.messages}>
          {messages &&
            messages
              .slice()
              .reverse()
              .map((m, i) => (
                <Message
                  key={i}
                  data={m}
                  // onEdit={handleEdit}
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
