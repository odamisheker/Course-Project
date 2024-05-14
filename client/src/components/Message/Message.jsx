import React, { useContext } from "react";
import Modal from "../Modal/Modal";
import { useState } from "react";
import styles from "./Message.module.css";
import ContextMenu from "../ContextMenu/ContextMenu";
import clipboard from "clipboard-copy";
import { UserContext } from "../context/UserContextProvider";

function Message({
  onDeleteForMe,
  onDelete,
  data: { _id, content, date, currentUser },
}) {
  const [position, setPosition] = useState({ x: null, y: null });
  const [menuActive, setMenuActive] = useState(false);
  const handleContextMenu = (e) => {
    e.preventDefault();
    setMenuActive(true);
    setPosition({ x: e.clientX, y: e.clientY });
  };

  const [modalActive, setModalActive] = useState(false);

  const classname = currentUser ? styles.currentUser : styles.otherUser;

  const { user } = useContext(UserContext);

  return (
    <div className={`${styles.main} ${classname}`}>
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
        <p className={styles.menuItem} onClick={() => onDeleteForMe(_id, user)}>
          Delete
        </p>
        <p className={styles.menuItem} onClick={() => onDelete(_id)}>
          Delete for all
        </p>
      </Modal>
      <div className={styles.message} onContextMenu={handleContextMenu}>
        <p className={styles.content}>{content}</p>
        <p className={styles.time}>
          {new Date(parseInt(date)).toLocaleString(undefined, {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </p>
      </div>
    </div>
  );
}

export default React.memo(Message);
