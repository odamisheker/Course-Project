import styles from "./Settings.module.css";

export default function Settings({ onClose }) {
  return (
    <div className={styles.main}>
      <button onClick={() => onClose(false)} className={styles.close}>
        X
      </button>
      <div className={styles.option}>1 set</div>
      <div className={styles.option}>1 set</div>
      <div className={styles.option}>1 set</div>
      <div className={styles.option}>1 set</div>
      <div className={styles.option}>1 set</div>
    </div>
  );
}
