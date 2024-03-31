import { useContext } from "react";
import styles from "./Settings.module.css";
import { UserContext } from "../context/UserContextProvider";

export default function Settings({ onClose }) {
  const { changeUser } = useContext(UserContext);

  return (
    <div className={styles.main}>
      <button onClick={() => onClose(false)} className={styles.close}>
        X
      </button>
      <div className={styles.option}>1 set</div>
      <div className={styles.option}>1 set</div>
      <div className={styles.option}>1 set</div>
      <div className={styles.option}>1 set</div>
      <div onClick={() => changeUser(null)} className={styles.option}>
        Log out
      </div>
    </div>
  );
}
