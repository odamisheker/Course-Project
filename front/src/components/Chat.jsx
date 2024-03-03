import { useContext, useState } from "react";
import { UserContext } from "./UserContextProvider";
import Message from "./Message";
import styles from "../styles/Chat.module.css";

export default function Chat() {
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState(null);
  const [messages, setMessages] = useState([]);

  /*
  TODO: load messanges
        props(id собеседника или же сразу сообщения)
        хранить сообщение как объект(для хранения текста, времени и тд)
  */

  const { id } = useContext(UserContext);

  const handleSend = () => {
    //  validate message
    //  post
    //  output on screen
    if (!message.trim()) return;
    setMessages((curMessanges) => [...curMessanges, message]);
    setMessage("");
  };
  return (
    <div className={styles.main}>
      <div className={styles.chat}>
        <div className={styles.messages}>
          {messages.map((m, i) => (
            <Message key={i} text={m} />
          ))}
        </div>
        <div className={styles.sendBlock}>
          <input
            placeholder="your message"
            className={styles.input}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <button className={styles.send} onClick={handleSend}>
            Send
          </button>
        </div>
      </div>
    </div>
  );
}
