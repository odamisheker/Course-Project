import { useContext, useMemo, useState } from "react";
import ToolBar from "../ToolBar/ToolBar";
import UserList from "../UserList/UserList";
import styles from "./MessageBar.module.css";
import chats from "../../DB";
import { UserContext } from "../context/UserContextProvider";

const searchFilter = (arr, term) =>
  arr.filter((item) =>
    item.trim().toLowerCase().includes(term.trim().toLowerCase())
  );

export default function MessageBar() {
  const { user } = useContext(UserContext);

  //TODO SearchBar & UserList
  const users = chats.filter((i) => i.userId == user).map((i) => i.id);

  const [sortText, setSortText] = useState("");

  const usersToView = useMemo(
    () => searchFilter(users, sortText),
    [sortText, users]
  );

  return (
    <div className={styles.main}>
      <ToolBar setSortText={setSortText} />
      <UserList users={usersToView} className={styles.userName} />
    </div>
  );
}
