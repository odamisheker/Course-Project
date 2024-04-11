import { useContext, useEffect, useMemo, useState } from "react";
import ToolBar from "../ToolBar/ToolBar";
import UserList from "../UserList/UserList";
import styles from "./MessageBar.module.css";
import chats from "../../DB";
import { UserContext } from "../context/UserContextProvider";
import Settings from "../Settings/Settings";

export default function MessageBar({ chats }) {
  //const { user } = useContext(UserContext);

  //TODO SearchBar & UserList

  // const users = chats.filter((i) => i.userId == user).map((i) => i.id);

  const [users, setUsers] = useState([]);

  const [isSettingsOn, setSettingsOn] = useState(false);

  return (
    <div className={styles.main}>
      {!isSettingsOn ? (
        <div className={styles.wrapper}>
          <ToolBar setUsers={setUsers} onOpen={setSettingsOn} />
          <UserList users={users} className={styles.userName} />
          {/* users={usersToView} */}
        </div>
      ) : (
        <Settings onClose={setSettingsOn} />
      )}
    </div>
  );
}
