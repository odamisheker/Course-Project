import { useContext, useEffect, useMemo, useState } from "react";
import ToolBar from "../ToolBar/ToolBar";
import User from "../User/User";
import styles from "./MessageBar.module.css";
import Settings from "../Settings/Settings";
import UserProfile from "../UserProfile/UserProfile";
import { UserContext } from "../context/UserContextProvider";

export default function MessageBar({ chats }) {
  const [users, setUsers] = useState([]);

  const [activeComponent, setActiveComponent] = useState("");

  const renderComponent = () => {
    switch (activeComponent) {
      case "settings":
        return <Settings onClose={() => setActiveComponent("messageBar")} />;
      case "userProfile":
        return <UserProfile onClose={() => setActiveComponent("messageBar")} />;
      default:
        return (
          <div className={styles.wrapper}>
            <ToolBar
              onUsersChange={setUsers}
              onOpenSettings={() => setActiveComponent("settings")}
              onOpenProfile={() => setActiveComponent("userProfile")}
            />
            {users.map((e, i) => <User key={i} user={e} />) || "no users"}
          </div>
        );
    }
  };

  return <div className={styles.main}>{renderComponent()}</div>;
}
