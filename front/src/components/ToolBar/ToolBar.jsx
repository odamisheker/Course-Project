import styles from "./ToolBar.module.css";

export default function ToolBar({ setSortText }) {
  return (
    <div className={styles.main}>
      <p className={styles.settings}>settings</p>
      <input
        onChange={(e) => setSortText(e.target.value)}
        className={styles.input}
      />
    </div>
  );
}
