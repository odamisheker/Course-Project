import { useContext } from "react";
import { UserContext } from "../context/UserContextProvider";
import styles from "./UserProfile.module.css";
import backIcon from "../../../public/back.svg";

export default function UserProfile({ onClose }) {
  const { user, changeUser } = useContext(UserContext);

  const handleLogOut = () => {
    changeUser(null);
    sessionStorage.removeItem("user");
  };
  return (
    <div className={styles.main}>
      <div className={styles.header}>
        <img
          src={backIcon}
          alt="back-icon"
          onClick={() => onClose(false)}
          className={styles.back}
        />
        <p>{user}</p>
      </div>
      <div>userPhoto</div>
      <div onClick={handleLogOut} className={styles.option}>
        Log out
      </div>
    </div>
  );
}
