import { useMemo, useState } from "react";
import ToolBar from "../ToolBar/ToolBar";
import UserList from "../UserList/UserList";
import styles from "./MessageBar.module.css";

const searchFilter = (arr, term) =>
  arr.filter((item) =>
    item.trim().toLowerCase().includes(term.trim().toLowerCase())
  );

export default function MessageBar() {
  //TODO SearchBar & UserList

  const users = ["egor", "Dalv", "nekit", "tim timkin", "dranik"];

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
