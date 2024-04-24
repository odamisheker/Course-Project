import { useContext } from "react";
import styles from "./Settings.module.css";
import { UserContext } from "../context/UserContextProvider";
import closeIcon from "../../../public/close.svg";

export default function Settings({ onClose }) {
  const { changeUser } = useContext(UserContext);

  return (
    <div className={styles.main}>
      <img
        src={closeIcon}
        alt="close"
        onClick={() => onClose(false)}
        className={styles.close}
      />
      <div className={styles.option}>Влад хрю хрю</div>
      <div className={styles.option}>Если посмотрел, то ЛОХ</div>
      <div onClick={() => changeUser(null)} className={styles.option}>
        Log out
      </div>
    </div>
  );
}
