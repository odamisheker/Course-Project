import { useContext, useState } from "react";
import { UserContext } from "../components/UserContextProvider";
import Message from "../components/Message";
import styles from "../styles/Chat.module.css";

export default function Chat() {
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState(null);
  const [messages, setMessages] = useState([]);

  /*
  TODO: load messanges
          chats
          toolbar
          load chats(users) or make another component(general)
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
