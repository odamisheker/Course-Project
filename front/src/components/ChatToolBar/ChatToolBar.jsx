import React, { useContext } from "react";
import styles from "./ChatToolBar.module.css";
import { ChatContext } from "../ChatContextProvider";

const ChatToolBar = () => {
  const { id } = useContext(ChatContext);
  return (
    <div className={styles.main}>
      <div className={styles.container}>
        <p className={styles.headText}>{id}</p>
        <p className={styles.extraText}>5 minutes again</p>
      </div>
    </div>
  );
};

export default React.memo(ChatToolBar);
