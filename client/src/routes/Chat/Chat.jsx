import { useContext, useEffect, useState } from "react";
import MessageBar from "../../components/MessageBar/MessageBar";
import WindowChat from "../../components/WindowChat/WindowChat";
import styles from "./Chat.module.css";
import { ChatContext } from "../../components/context/ChatContextProvider";
import chats from "../../DB";
import { UserContext } from "../../components/context/UserContextProvider";

export default function Chat() {
  /*
    TODO
        load chats, toolbar, another component for person from chats
    */
  const { chatId } = useContext(ChatContext);

  const { user } = useContext(UserContext);
  const users = chats.filter((i) => i.userId == user).map((i) => i.id);

  const [messages, setMessages] = useState([]);

  useEffect(() => {
    if (chatId != null) {
      setMessages(chats.find((k) => k.id == chatId).messages);
    }
  }, [chatId]);

  return (
    <div className={styles.main}>
      <MessageBar className={styles.messageBar} users={users} />
      {(chatId && (
        <WindowChat className={styles.windowChat} messages={messages} />
      )) || <h1 className={styles.welcome}>Welcome to Session</h1>}
    </div>
  );
}
