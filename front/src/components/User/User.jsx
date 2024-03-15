import React, { useContext } from "react";
import styles from "./User.module.css";
import ContextMenu from "../ContextMenu/ContextMenu";
import { ChatContext } from "../ChatContextProvider";

const User = ({ name }) => {
  const { changeId } = useContext(ChatContext);

  return (
    <div className={styles.main} onClick={() => changeId(name)}>
      <div className={styles.userPhoto}>userPhoto</div>
      <div className={styles.container}>
        <p className={styles.userName}>{name}</p>
        <p className={styles.message}>lastMessage</p>
      </div>
    </div>
  );
};

export default React.memo(User);
