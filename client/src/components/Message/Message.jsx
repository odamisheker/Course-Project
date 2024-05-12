import React from "react";
import Modal from "../Modal/Modal";
import { useState } from "react";
import styles from "./Message.module.css";
import ContextMenu from "../ContextMenu/ContextMenu";
import clipboard from "clipboard-copy";

function Message({ onDeleteForMe,onDelete, onEdit, data: { _id, content, data } }) {
  //data:{ ... }
  /*
  TODO:
    time
    date
    maybe edit delete
  */

  //const { text, time, username } = data;

  const [position, setPosition] = useState({ x: null, y: null });
  const [menuActive, setMenuActive] = useState(false);
  const handleContextMenu = (e) => {
    e.preventDefault();
    setMenuActive(true);
    setPosition({ x: e.clientX, y: e.clientY });
  };

  const [modalActive, setModalActive] = useState(false);

  return (
    <div className={styles.main}>
      <ContextMenu
        active={menuActive}
        setActive={setMenuActive}
        position={position}
      >
        <p className={styles.menuItem}>Answer</p>
        <p className={styles.menuItem} onClick={() => clipboard(text)}>
          Copy
        </p>
        {/* <p className={styles.menuItem} onClick={() => onEdit(data)}>
          Edit
        </p> */}
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
        <p className={styles.menuItem} onClick={() => onDeleteForMe(_id)}>
          Delete
        </p>
        <p className={styles.menuItem} onClick={() => onDelete(_id)}>
          Delete for all
        </p>
      </Modal>
      <div className={styles.message} onContextMenu={handleContextMenu}>
        <p className={styles.content}>{data}</p>
        <p className={styles.time}>
          {/* {new Date(time).toLocaleString(undefined, {
            hour: "2-digit",
            minute: "2-digit",
          })} */}
          23:45
        </p>
      </div>
    </div>
  );
}

export default React.memo(Message);
