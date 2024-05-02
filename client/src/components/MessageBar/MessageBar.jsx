import { useContext, useEffect, useMemo, useState } from "react";
import ToolBar from "../ToolBar/ToolBar";
import User from "../User/User";
import styles from "./MessageBar.module.css";
import Settings from "../Settings/Settings";
import { UserContext } from "../context/UserContextProvider";

export default function MessageBar({ chats }) {
  const [users, setUsers] = useState([]);

  const [isSettingsOn, setSettingsOn] = useState(false);

  return (
    <div className={styles.main}>
      {!isSettingsOn ? (
        <div className={styles.wrapper}>
          <ToolBar onUsersChange={setUsers} onOpen={setSettingsOn} />
          {users.map((e, i) => <User key={i} user={e} />) || "no users"}
        </div>
      ) : (
        <Settings onClose={setSettingsOn} />
      )}
    </div>
  );
}
