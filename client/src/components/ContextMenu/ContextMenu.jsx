import styles from "./ContextMenu.module.css";

export default function ContextMenu({
  active,
  setActive,
  position: { x, y },
  children,
}) {
  // проверка координат на выход за поля окна браузера
  const adjustedX = x + 200 > window.innerWidth ? x - 200 : x;
  const adjustedY = y + 250 > window.innerHeight ? y - 200 : y;

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
          top: adjustedY,
          left: adjustedX,
        }}
      >
        {children}
      </div>
    </div>
  );
}
