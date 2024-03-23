import React from "react";
import Modal from "../Modal/Modal";
import { useState } from "react";
import styles from "./Message.module.css";
import ContextMenu from "../ContextMenu/ContextMenu";
import clipboard from "clipboard-copy";

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

  const [modalActive, setModalActive] = useState(false);

  return (
    <>
      <ContextMenu
        active={menuActive}
        setActive={setMenuActive}
        position={position}
      >
        <p className={styles.menuItem}>Answer</p>
        <p className={styles.menuItem} onClick={() => clipboard(text)}>
          Copy
        </p>
        <p className={styles.menuItem}>Edit</p>
        <p className={styles.menuItem}>Pin</p>
        <p className={styles.menuItem}>Переслать</p>
        <p
          className={styles.menuItem}
          onClick={(e) => {
            e.stopPropagation();
            setModalActive(true);
            setMenuActive(false);
          }}
        >
          Delete
        </p>
      </ContextMenu>
      <Modal active={modalActive} setActive={setModalActive}>
        <p className={styles.menuItem}>Delete</p>
        <p className={styles.menuItem}>Delete for all</p>
      </Modal>
      <div onContextMenu={handleContextMenu} className={styles.container}>
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
    </>
  );
}

export default React.memo(Message);
