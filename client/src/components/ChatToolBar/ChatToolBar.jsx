import React, { useContext } from "react";
import styles from "./ChatToolBar.module.css";
import { ChatContext } from "../context/ChatContextProvider";

const ChatToolBar = () => {
  const { chatId } = useContext(ChatContext);
  return (
    <div className={styles.main}>
      <div className={styles.container}>
        <p className={styles.headText}>{chatId || "Welcome to SESSION"}</p>
        <p className={styles.extraText}>5 minutes again</p>
      </div>
    </div>
  );
};

export default React.memo(ChatToolBar);
