import { useCallback, useContext, useState } from "react";
import { UserContext } from "../UserContextProvider";
import Message from "../Message/Message";
import styles from "./WindowChat.module.css";
import InputMessage from "../InputMessage/InputMessage";

export default function WindowChat() {
  const [errors, setErrors] = useState(null);
  const [messages, setMessages] = useState([]);

  /*
  TODO: load messanges 
        props(id собеседника или же сразу сообщения)
        хранить сообщение как объект(для хранения текста, времени и тд)
  */

  const { id } = useContext(UserContext);

  const handleSend = useCallback((newMessage) => {
    //  post
    //  output on screen

    setMessages((curMessanges) => [...curMessanges, newMessage]);
  }, []);

  return (
    <div className={styles.main}>
      <div className={styles.wrapper}>
        <div className={styles.chat}>
          <div className={styles.messages}>
            {messages.map((m, i) => (
              <Message key={i} data={m} />
            ))}
          </div>
          <InputMessage onSend={handleSend} />
        </div>
      </div>
    </div>
  );
}
