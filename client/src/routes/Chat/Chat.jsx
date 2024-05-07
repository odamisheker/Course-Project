import { useContext } from "react";
import MessageBar from "../../components/MessageBar/MessageBar";
import WindowChat from "../../components/WindowChat/WindowChat";
import styles from "./Chat.module.css";
import { ChatContext } from "../../components/context/ChatContextProvider";

export default function Chat() {
  const { chatID } = useContext(ChatContext);

  return (
    <div className={styles.main}>
      <MessageBar className={styles.messageBar} />
      {(chatID && <WindowChat className={styles.windowChat} />) || (
        <div className={styles.welcomeBlock}>
          <h1 className={styles.welcome}>welcome to SESSION</h1>
        </div>
      )}
    </div>
  );
}
