import { useContext, useState } from "react";
import axios from "axios";

import { useNavigate } from "react-router-dom";
import { UserContext } from "../../components/context/UserContextProvider";

import styles from "./Login.module.css";
//import { User } from "../../utils/validation";

export default function Login() {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState(null);

  const navigate = useNavigate();
  const { changeUser } = useContext(UserContext);

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleLogin();
    }
  };

  const handleLogin = async () => {
    // try {
    //   User.parse({ password });
    // } catch (err) {
    //   setErrors(err?.errors?.map((error) => error.message).join(", "));
    // }
    if (name.trim() == "" || password.trim() == "") return;
    // ! проверить правильность написания запроса
    axios
      .post("http://localhost:8000/auth/login", {
        username: name,
        password: password,
      })
      .then((res) => {
        changeUser(name);
        navigate("/chat");
      })
      .catch((e) => {
        setErrors(e.response.data.message);
      });
  };

  return (
    <div className={styles.main}>
      <h1 className={styles.title}>SESSION</h1>
      <div className={styles.wrapper}>
        <div className={styles.desc}>Non-anonymous use:</div>
        <div className={styles.block}>
          <input
            placeholder="Login"
            className={styles.input}
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            placeholder="Password"
            type="password"
            className={styles.input}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            className={styles.connect}
            onClick={handleLogin}
            onKeyUp={handleKeyPress}
          >
            Connect
          </button>
          {errors && (
            <div className={styles.error}>
              {errors.split(",").map((error, index) => (
                <div key={index}>{error}</div>
              ))}
            </div>
          )}
        </div>
        <p onClick={() => navigate("/signup")} className={styles.navigate}>
          Don't have account - sign up
        </p>
      </div>
    </div>
  );
}
