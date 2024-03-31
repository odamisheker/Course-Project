import { useContext, useMemo, useState } from "react";
import ToolBar from "../ToolBar/ToolBar";
import UserList from "../UserList/UserList";
import styles from "./MessageBar.module.css";
import chats from "../../DB";
import { UserContext } from "../context/UserContextProvider";
import Settings from "../Settings/Settings";

const searchFilter = (arr, term) =>
  arr.filter((item) =>
    item.trim().toLowerCase().includes(term.trim().toLowerCase())
  );

export default function MessageBar({ users }) {
  //const { user } = useContext(UserContext);

  //TODO SearchBar & UserList

  const [sortText, setSortText] = useState("");

  const usersToView = useMemo(
    () => searchFilter(users, sortText),
    [sortText, users]
  );

  const [isSettingsOn, setSettingsOn] = useState(false);

  return (
    <div className={styles.main}>
      <ToolBar setSortText={setSortText} onOpen={setSettingsOn} />
      {!isSettingsOn ? (
        <UserList users={usersToView} className={styles.userName} />
      ) : (
        <Settings onClose={setSettingsOn} />
      )}
    </div>
  );
}
