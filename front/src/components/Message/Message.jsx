import React from "react";
import Modal from "../Modal/Modal";
import { useState } from "react";
import styles from "./Message.module.css";

function Message({ data: { text, time, username } }) {
  /*
  TODO:
    time
    date
    maybe edit delete
  */

  const [modalActive, setModaleActive] = useState(false);
  return (
    <div
      onContextMenu={(e) => {
        e.preventDefault();
        console.log(e);
        setModaleActive(true);
      }}
      className={styles.container}
    >
      <Modal active={modalActive} setActive={setModaleActive}>
        <div className={styles.modal}>
          <button className={styles.button}>delete</button>
          <button className={styles.button}>edit</button>
        </div>
      </Modal>
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
