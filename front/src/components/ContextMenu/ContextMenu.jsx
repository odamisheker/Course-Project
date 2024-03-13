import styles from "./ContextMenu.module.css";

export default function ContextMenu({
  active,
  setActive,
  position: { x, y },
  children,
}) {
  return (
    <div
      onClick={() => setActive(false)}
      onContextMenu={(e) => {
        e.preventDefault();
        e.stopPropagation();
        setActive(false);
      }}
      className={`${styles.container} ${active ? styles.active : ""}`}
    >
      <div
        className={`${styles.content} ${active ? styles.content_active : ""}`}
        style={{
          position: "absolute",
          top: y,
          left: x,
        }}
      >
        {children}
      </div>
    </div>
  );
}
