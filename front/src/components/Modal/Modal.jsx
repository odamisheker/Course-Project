import styles from "./Modal.module.css";

export default function Modal({ active, setActive, children }) {
  return (
    <div
      className={active ? `${styles.modal} ${styles.active}` : styles.modal}
      onClick={(e) => {
        e.stopPropagation();
        setActive(false);
      }}
    >
      <div
        className={
          active ? `${styles.content} ${styles.content_active}` : styles.content
        }
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  );
}
