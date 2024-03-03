import Chat from "../components/Chat";
import styles from "../styles/WindowChat.module.css";

export default function WindowChat() {
    /*
    TODO: 
        load chats
        toolbar
        another component for person from chats
    */
  return (
    <div className={styles.main}>
      <div className={styles.chats}>chats</div>
      <Chat />
    </div>
  );
}
