import { useContext, useState } from "react";

import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../../components/context/UserContextProvider";

import styles from "./Login.module.css";
import { User } from "../../utils/validation";

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

  //  fetch...
  //  validate user?
  // if true go home (fetch)
  const handleLogin = async () => {
    try {
      User.parse({ password });
      changeUser(name);
      navigate("/chat");
    } catch (err) {
      setErrors(err?.errors?.map((error) => error.message).join(", "));
    }
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
        <Link to="/signup" className={styles.navigate}>
          Don't have account - sign up
        </Link>
      </div>
    </div>
  );
}
