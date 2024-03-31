import { useCallback, useContext, useEffect, useState } from "react";
import { UserContext } from "../context/UserContextProvider";
import Message from "../Message/Message";
import styles from "./WindowChat.module.css";
import InputMessage from "../InputMessage/InputMessage";
import ChatToolBar from "../ChatToolBar/ChatToolBar";
import { ChatContext } from "../context/ChatContextProvider";
//import chats from "../../DB";

export default function WindowChat({ messages, onSend }) {
  const { user } = useContext(UserContext);
  const { chatId } = useContext(ChatContext);
  // const [errors, setErrors] = useState(null);

  const [message, setMessage] = useState({ text: "" });

  /*
  TODO: хранить сообщение как объект(для хранения текста, времени и тд)
  */

  const handleEdit = (data) => {
    setMessage(data);
  };

  const handleDelete = () => {};

  const handleSend = useCallback((newMessage) => {
    //  post
    //  output on screen

    onSend((curMessanges) => [...curMessanges, newMessage]);
  }, []);

  return (
    <div className={styles.main}>
      <div className={styles.wrapper}>
        <div className={styles.chat}>
          <ChatToolBar />
          {chatId && (
            <div className={styles.messages}>
              {messages.map((m, i) => (
                <Message
                  key={i}
                  data={m}
                  onEdit={handleEdit}
                  onDelete={handleDelete}
                />
              ))}
            </div>
          )}
          {chatId && (
            <InputMessage
              message={message}
              onMessageChange={setMessage}
              onSend={handleSend}
            />
          )}
        </div>
      </div>
    </div>
  );
}
