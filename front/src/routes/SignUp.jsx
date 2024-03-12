// ! work for slave Danik

import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../components/UserContextProvider";
import styles from "../styles/SignUp.module.css";

export default function SignUp() {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [errors, setErrors] = useState(null);

  const navigate = useNavigate();
  const { changeUser } = useContext(UserContext);

  const handleLogin = (password, repeatPassword) => {
    //  fetch...
    //  validate user?
    // if true go home (fetch)
    changeUser(name);
    navigate("/home");
    /*if (password != repeatPassword) {
      setErrors("Invalid password");
      console.log(errors);
    }
    */
  };



  return (
    <div className={styles.main}>
      <div className={styles.wrapper}>
        <h1 className={styles.title}>SESSION</h1>
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
          <input
            placeholder="Repeat password"
            type="password"
            className={styles.input}
            value={repeatPassword}
            onChange={(e) => setRepeatPassword(e.target.value)}
          />
          <button className={styles.connect} 
            onClick={handleLogin}
          >
            SignUp
          </button>
          <button
            className={styles.navigate}
            onClick={() => navigate("/login")}
            
          >
            Already have account?
          </button>
        </div>
      </div>
    </div>
  );
}
