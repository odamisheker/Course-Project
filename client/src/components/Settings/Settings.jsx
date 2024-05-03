import { useContext } from "react";
import styles from "./Settings.module.css";
import { UserContext } from "../context/UserContextProvider";
import backIcon from "../../../public/back.svg";

export default function Settings({ onClose }) {
  const { changeUser } = useContext(UserContext);

  return (
    <div className={styles.main}>
      <div className={styles.header}>
        <img
          src={backIcon}
          alt="back-icon"
          onClick={() => onClose(false)}
          className={styles.back}
        />
        <p>SETTINGS</p>
      </div>
      <div className={styles.option}>Влад хрю хрю</div>
      <div className={styles.option}>Если посмотрел, то ЛОХ</div>
      <div onClick={() => changeUser(null)} className={styles.option}>
        Log out
      </div>
    </div>
  );
}
