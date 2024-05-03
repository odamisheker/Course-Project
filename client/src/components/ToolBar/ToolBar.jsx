import styles from "./ToolBar.module.css";
import settingsIcon from "../../../public/settings.svg";
import axios from "axios";
import { apiClient } from "../../api";

export default function ToolBar({
  onUsersChange,
  onOpenSettings,
  onOpenProfile,
}) {
  //TODO button "Settings" and photo profile

  const handleSearch = (e) => {
    if (e.target.value == "") {
      return;
    }

    apiClient
      .searchByUsername({ searchInput: e.target.value })
      .then((res) => {
        // console.log(r.data);
        onUsersChange(res.data);
      })
      .catch((e) => console.log(e.response.data.message));
  };

  return (
    <div className={styles.main}>
      <div className={styles.avatar} onClick={onOpenProfile}></div>
      <img
        className={styles.settings}
        onClick={onOpenSettings}
        src={settingsIcon}
        alt="settings"
      />
      <input
        onChange={handleSearch}
        //onFocus={handleSearch}
        placeholder="search"
        className={styles.input}
      />
    </div>
  );
}
