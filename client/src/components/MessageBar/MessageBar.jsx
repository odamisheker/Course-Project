import { useContext, useEffect, useMemo, useState } from "react";
import ToolBar from "../ToolBar/ToolBar";
import UserList from "../UserList/UserList";
import styles from "./MessageBar.module.css";
import chats from "../../DB";
import { UserContext } from "../context/UserContextProvider";
import Settings from "../Settings/Settings";
import axios from "axios";

const searchFilter = (arr, term) =>
  arr.filter((item) =>
    item.trim().toLowerCase().includes(term.trim().toLowerCase())
  );

export default function MessageBar({ chats }) {
  //const { user } = useContext(UserContext);

  //TODO SearchBar & UserList

  const [sortText, setSortText] = useState("");
  // const users = chats.filter((i) => i.userId == user).map((i) => i.id);

  // const usersToView = useMemo(
  //   () => searchFilter(users, sortText),
  //   [sortText, users]
  // );

  // useEffect(() => {
  //   axios("/users/id") // чето типо такого /users/${sortText}
  //     .then((r) =>
  //       //добавление пользователей найденных по подстроке
  //       // в массив usersToView
  //       console.log(r)
  //     )
  //     .catch((e) => console.log(e));
  // }, [sortText]);

  const [isSettingsOn, setSettingsOn] = useState(false);

  return (
    <div className={styles.main}>
      {!isSettingsOn ? (
        <div className={styles.wrapper}>
          <ToolBar setSortText={setSortText} onOpen={setSettingsOn} />
          <UserList className={styles.userName} />
          {/* users={usersToView} */}
        </div>
      ) : (
        <Settings onClose={setSettingsOn} />
      )}
    </div>
  );
}
