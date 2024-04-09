import { useContext, useEffect, useState } from "react";
import MessageBar from "../../components/MessageBar/MessageBar";
import WindowChat from "../../components/WindowChat/WindowChat";
import styles from "./Chat.module.css";
import { ChatContext } from "../../components/context/ChatContextProvider";
import chats from "../../DB";
import { UserContext } from "../../components/context/UserContextProvider";
import { useLoaderData } from "react-router-dom";
import axios from "axios";

export const loader = async () => {
  // axios("/id/chats") //!хз какой url
  //   .then((r) => {
  //     console.log(r);
  //   })
  //   .catch((e) => console.log(e));
  return { chats };
};

export default function Chat() {
  /*
    TODO
        load chats, toolbar, another component for person from chats
    */
  //  const {chats} = useLoaderData()

  const { chatId } = useContext(ChatContext);

  const { user } = useContext(UserContext);

  const [messages, setMessages] = useState([]);

  useEffect(() => {
    if (chatId != null) {
      setMessages(chats.find((k) => k.id == chatId).messages);
    }
  }, [chatId]);

  return (
    <div className={styles.main}>
      <MessageBar className={styles.messageBar} chats={chats} />
      {(chatId && (
        <WindowChat
          className={styles.windowChat}
          messages={messages}
          onSend={setMessages}
        />
      )) || <h1 className={styles.welcome}>Welcome to Session</h1>}
    </div>
  );
}
