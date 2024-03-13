import React from "react";
import Modal from "../Modal/Modal";
import { useState } from "react";
import styles from "./Message.module.css";
import ContextMenu from "../ContextMenu/ContextMenu";

function Message({ data: { text, time, username } }) {
  /*
  TODO:
    time
    date
    maybe edit delete
  */

  const [position, setPosition] = useState({ x: null, y: null });
  const [menuActive, setMenuActive] = useState(false);
  const handleContextMenu = (e) => {
    e.preventDefault();
    setMenuActive(true);
    setPosition({ x: e.clientX, y: e.clientY });
  };
  return (
    <div onContextMenu={handleContextMenu} className={styles.container}>
      <ContextMenu
        active={menuActive}
        setActive={setMenuActive}
        position={position}
      />
      <div className={styles.message}>
        <p>{text}</p>
        <p className={styles.time}>
          {new Date(time).toLocaleString(undefined, {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </p>
      </div>
    </div>
  );
}

export default React.memo(Message);
