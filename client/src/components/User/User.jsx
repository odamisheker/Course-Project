import React, { useContext } from "react";
import styles from "./User.module.css";
import ContextMenu from "../ContextMenu/ContextMenu";
import { ChatContext } from "../context/ChatContextProvider";
import axios from "axios";
import { UserContext } from "../context/UserContextProvider";

const User = ({ name, id }) => {
  const { user } = useContext(UserContext);
  //const { changeChatID } = useContext(ChatContext);
  const { changeChat } = useContext(ChatContext);

  const getChatNameForChat = (chatname, currentUser) => {
    const users = chatname.split("&");

    return users.find((user) => user.trim() !== currentUser.trim());
  };

  name = getChatNameForChat(name, user);

  const handleOpenChat = () => {
    if (id) changeChat({ chatID: id, chatname: name });
    else {
      axios
        .post("http://localhost:8000/chat/chat", {
          username1: user,
          username2: name,
        })
        .then((r) => {
          console.log(r.data);
          //changeChatId(r.data);
          changeChat({ chatID: r.data, chatname: name });
        })
        .catch((e) => {
          console.log("Chat not exists", e.response);
          axios
            .post("http://localhost:8000/chat/chat/create", {
              username1: user,
              username2: name,
            })
            .then((r) => {
              console.log("New chat created", r.data.chatID);
              changeChat({ chatID: r.data.chatID, chatname: name });
            })
            .catch((e) => console.log("Chat create error", e.response));
        });
    }
  };

  return (
    <div className={styles.main} onClick={handleOpenChat}>
      <div className={styles.wrapper}>
        <div className={styles.avatar}></div> {/*<img> */}
        <div className={styles.container}>
          <p className={styles.username}>{name}</p>
        </div>
      </div>
      <div className={styles.id}>ID:idididi</div>
    </div>
  );
};

export default React.memo(User);
