import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../../components/UserContextProvider";
import styles from "./EnterChat.module.css";
import { Code } from "../../utils/validation";

export default function EnterChat() {
  const [code, setCode] = useState("");
  const [errors, setErrors] = useState(null);

  const navigate = useNavigate();
  const { changeUser } = useContext(UserContext);

  //Убрал name и setName т.к по идее мы будем заходить анонимно и имя нам не понадобиться,
  //переписка будет идти с челом про которого известен только рандомно сгенерированный айдишник
  //и при желании(если он указал имя), то его имя

  //  fetch...
  //  validate user?
  // if true go home (fetch)
  const handleEnterChat = () => {
    try {
      Code.parse({ code });
      changeUser(code);
      navigate("/home");
      setErrors(null);
    } catch (err) {
      setErrors(err?.errors?.map((error) => error.message));
    }
  };

  return (
    <div className={styles.main}>
      <h1 className={styles.title}>SESSION</h1>
      <div className={styles.wrapper}>
        <div className={styles.desc}>Anonymous use: </div>
        <div className={styles.block}>
          <input
            placeholder="Chat code"
            className={styles.input}
            value={code}
            onChange={(e) => setCode(e.target.value)}
          />
          <button className={styles.connect} onClick={handleEnterChat}>
            Connect
          </button>
          {errors && <div className={styles.error}>{errors}</div>}
        </div>
        <Link to="/login" className={styles.navigate}>
          Use it non-anonymously
        </Link>
      </div>
    </div>
  );
}
