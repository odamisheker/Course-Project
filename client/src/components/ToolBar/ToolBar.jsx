import styles from "./ToolBar.module.css";
import { apiClient } from "../../api";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { UserContext } from "../context/UserContextProvider";

export default function ToolBar({ chats, onChatsChange, onOpenProfile }) {
  //TODO  and photo profile

  const { user } = useContext(UserContext);

  const [searchInput, setSearchInput] = useState("");

  useEffect(() => {
    fetchChats();
  }, [searchInput]);

  const fetchChats = () => {
    if (!searchInput) {
      apiClient
        .getChats({ username: user })
        .then((res) => onChatsChange(res.data))
        .catch((e) => console.log(e.response.message));
    } else {
      const searchedChats = chats.filter((c) => c.name.includes(searchInput));
      if (searchedChats.length != 0) {
        onChatsChange(searchedChats);
        return;
      } else {
        apiClient
          .searchByUsername({ searchInput: searchInput })
          .then((res) => {
            //console.log(res.data);
            if (res.data.length != 0) onChatsChange(res.data);
          })
          .catch((e) => console.log(e.response.data.message));
      }
    }
  };

  return (
    <div className={styles.main}>
      <div className={styles.avatar} onClick={onOpenProfile}></div>
      <input
        onChange={(e) => setSearchInput(e.target.value)}
        //onFocus={handleSearch}
        placeholder="search"
        className={styles.input}
      />
    </div>
  );
}
