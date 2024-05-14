import React, { useContext, useState } from "react";
import styles from "./ChatToolBar.module.css";
import { ChatContext } from "../context/ChatContextProvider";
import Modal from "../Modal/Modal";

const ChatToolBar = () => {
  const [modalActive, setModalActive] = useState(false);
  const {
    chat: { chatname },
  } = useContext(ChatContext);
  return (
    <>
      <div className={styles.main} onClick={() => setModalActive(true)}>
        <div className={styles.container}>
          <p className={styles.headText}>{chatname}</p>
          {/* <p className={styles.extraText}>5 minutes again</p> */}
        </div>
      </div>
      <Modal active={modalActive} setActive={setModalActive}>
        <p>delete</p>
      </Modal>
    </>
  );
};

export default React.memo(ChatToolBar);
