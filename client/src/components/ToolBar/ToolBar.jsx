import styles from "./ToolBar.module.css";
import { apiClient } from "../../api";

export default function ToolBar({ onUsersChange, onOpenProfile }) {
  //TODO  and photo profile

  const handleSearch = (e) => {
    if (e.target.value == "") {
      return;
    }

    apiClient
      .searchByUsername({ searchInput: e.target.value })
      .then((res) => {
        console.log(res.data);
        if (res.data.length != 0) onUsersChange(res.data);
      })
      .catch((e) => console.log(e.response.data.message));
  };

  return (
    <div className={styles.main}>
      <div className={styles.avatar} onClick={onOpenProfile}></div>
      <input
        onChange={handleSearch}
        //onFocus={handleSearch}
        placeholder="search"
        className={styles.input}
      />
    </div>
  );
}
