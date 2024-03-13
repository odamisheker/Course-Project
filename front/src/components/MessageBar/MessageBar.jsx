import UserList from "../UserList/UserList";
import styles from "./MessageBar.module.css";

export default function MessageBar() {
  //TODO SearchBar & UserList
  return (
    <div className={styles.main}>
      <UserList className={styles.userName} />
    </div>
  );
}
