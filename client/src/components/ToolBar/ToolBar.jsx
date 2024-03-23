import styles from "./ToolBar.module.css";

export default function ToolBar({ setSortText }) {
  //TODO button "Settings" and photo profile

  return (
    <div className={styles.main}>
      <p>tvoe ebalo</p>
      <p className={styles.settings}>settings</p>
      <input
        onChange={(e) => setSortText(e.target.value)}
        className={styles.input}
      />
    </div>
  );
}
