import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../components/context/UserContextProvider";
import styles from "./EnterChat.module.css";

export default function EnterChat() {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState(null);

  const navigate = useNavigate();
  const { changeUser } = useContext(UserContext);

  const handleLogin = () => {
    //  fetch...
    //  validate user?
    // if true go home (fetch)
    changeUser(name);
    navigate("/home");
  };

  return (
    <div className={styles.main}>
      <div className={styles.wrapper}>
        <h1 className={styles.title}>SESSION</h1>
        <div className={styles.block}>
          <input
            placeholder="Chat code"
            className={styles.input}
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <button className={styles.connect} onClick={handleLogin}>
            Connect
          </button>
          <button
            className={styles.navigate}
            onClick={() => navigate("/login")}
          >
            Not anonymous login
          </button>
        </div>
      </div>
    </div>
  );
}
