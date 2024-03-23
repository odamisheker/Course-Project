import React, { useContext, useState } from "react";
import styles from "./InputMessage.module.css";
import { UserContext } from "../UserContextProvider";

const InputMessage = ({ onSend }) => {
  //TODO эмоджи, файлы , фото ,  видео, гс
  // может даже тут отправлять на сервер сообщение, но хз

  const { id } = useContext(UserContext);

  const [message, setMessage] = useState("");

  //TODO найти что нибудь поприличнее этого , если есть конечно
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSend();
    }
  };

  const handleSend = () => {
    //Todo validate message

    if (!message.trim()) return;

    const newMessage = {
      text: message.trim(),
      time: Date.now(),
      username: id,
    };

    onSend(newMessage);
    setMessage("");
  };

  return (
    <div className={styles.container}>
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
  );
};

export default React.memo(InputMessage);
