import React, { useContext } from "react";
import styles from "./User.module.css";
import ContextMenu from "../ContextMenu/ContextMenu";
import { ChatContext } from "../context/ChatContextProvider";
import axios from "axios";
import { UserContext } from "../context/UserContextProvider";

const User = ({ user: { username } }) => {
  const { user } = useContext(UserContext);
  const { changeChatId } = useContext(ChatContext);

  const handleOpenChat = () => {
    axios
      .get("http://localhost:8000/chat", {
        username1: user,
        username2: username,
      })
      .then((r) => {
        console.log(r.data);
        changeChatId(r.data);
      })
      .catch((e) => {
        console.log("Chat not exists", e.response);
        axios
          .post("http://localhost:8000/chat/create", {
            username1: user,
            username2: username,
          })
          .then((r) => {
            console.log("New chat created", r.data);
            changeChatId(r.data);
          })
          .catch((e) => console.log("Chat create error", e.response));
      });
  };

  return (
    <div className={styles.main} onClick={handleOpenChat}>
      <div className={styles.wrapper}>
        <div className={styles.userPhoto}>Photo</div> {/*<img> */}
        <div className={styles.container}>
          <p className={styles.userName}>{username}</p>
          {/* <p className={styles.message}>{lastMessage}</p> */}
        </div>
      </div>
      <div className={styles.id}>ID:123123</div>
    </div>
  );
};

export default React.memo(User);
