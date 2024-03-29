import React, { useContext } from "react";
import styles from "./User.module.css";
import ContextMenu from "../ContextMenu/ContextMenu";
import { ChatContext } from "../context/ChatContextProvider";

const User = ({ name }) => {
  const { changeChatId } = useContext(ChatContext);

  return (
    <div className={styles.main} onClick={() => changeChatId(name)}>
      <div className={styles.wrapper}>
        <div className={styles.userPhoto}>Photo</div> {/*<img> */}
        <div className={styles.container}>
          <p className={styles.userName}>{name}</p>
          <p className={styles.message}>lastMessage</p>
        </div>
      </div>
      <div className={styles.id}>ID:123123</div>
    </div>
  );
};

export default React.memo(User);
