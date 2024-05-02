import { useCallback, useContext, useState } from "react";
import { UserContext } from "../context/UserContextProvider";
import Message from "../Message/Message";
import styles from "./WindowChat.module.css";
import InputMessage from "../InputMessage/InputMessage";
import ChatToolBar from "../ChatToolBar/ChatToolBar";
import { ChatContext } from "../context/ChatContextProvider";

export default function WindowChat() {
  const { user } = useContext(UserContext);
  const { chatId } = useContext(ChatContext);

  //const [message, setMessage] = useState({ text: "" });

  //TODO: {messages, sendMessage, removeMessage} = useChat(chatID)

  const handleSend = useCallback((newMessage) => {
    //*create Chat
    // axios
    //   .post("http://localhost:8000/...", {
    //     id_1: user,
    //     id_2: chatId,
    //     messageInput: message,
    //   })
    //   .then((res) => {
    //     console.log(res);
    //   })
    //   .catch((e) => {
    //     console.log(e.response.data);
    //   });
    //* send message
    // axios
    //   .post("http://localhost:8000/", {
    //     /*newMessage Object*/
    //   })
    //   .then((res) => {
    //     console.log(res);
    //   })
    //   .catch((e) => {
    //     console.log(e.response.data);
    //   });
    //  socket send
    //  output on screen
    //onSend((curMessanges) => [...curMessanges, newMessage]);
  }, []);

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
                // onEdit={handleEdit}
                // onDelete={handleDelete}
              />
            ))}
        </div>
        <InputMessage
          message={message}
          onMessageChange={setMessage}
          onSend={handleSend}
        />
      </div>
    </div>
  );
}
