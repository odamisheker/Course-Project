import { useContext, useEffect, useMemo, useState } from "react";
import ToolBar from "../ToolBar/ToolBar";
import User from "../User/User";
import styles from "./MessageBar.module.css";
import UserProfile from "../UserProfile/UserProfile";
import { UserContext } from "../context/UserContextProvider";
import axios from "axios";

export default function MessageBar() {
  const { user } = useContext(UserContext);
  const [chats, setChats] = useState([]);

  const [activeComponent, setActiveComponent] = useState("");

  // useEffect(() => {
  //   //console.log(user);
  //   axios
  //     .post("http://localhost:8000/auth/chats", { username: user })
  //     .then((res) => setChats(res.data))
  //     .catch((e) => console.log(e.response.message));
  // }, []);

  const renderComponent = () => {
    switch (activeComponent) {
      case "userProfile":
        return <UserProfile onClose={() => setActiveComponent("messageBar")} />;
      default:
        return (
          <div className={styles.wrapper}>
            <ToolBar
              chats={chats}
              onChatsChange={setChats}
              onOpenProfile={() => setActiveComponent("userProfile")}
            />
            {chats.length != 0
              ? chats.map((e, i) => (
                  <User key={i} name={e.name} id={e.chatID} />
                ))
              : "no chats"}
          </div>
        );
    }
  };

  return <div className={styles.main}>{renderComponent()}</div>;
}
