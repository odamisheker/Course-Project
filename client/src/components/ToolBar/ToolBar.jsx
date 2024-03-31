import styles from "./ToolBar.module.css";
import settingsIcon from "../../../public/settings.png";

export default function ToolBar({ setSortText, onOpen }) {
  //TODO button "Settings" and photo profile

  return (
    <div className={styles.main}>
      <p>tvoe ebalo</p>
      <p className={styles.settings} onClick={() => onOpen(true)}>
        . . .
      </p>
      {/* <img
        className={styles.settings}
        onClick={() => onOpen(true)}
        src={settingsIcon}
        alt="settings"
      /> */}
      <input
        onChange={(e) => setSortText(e.target.value)}
        placeholder="Search"
        className={styles.input}
      />
    </div>
  );
}
