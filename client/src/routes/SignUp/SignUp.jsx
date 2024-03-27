// ! work for slave Danik

import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../components/context/UserContextProvider";
import { User } from "../../utils/validation";
import styles from "./SignUp.module.css";

export default function SignUp() {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState(null);

  const navigate = useNavigate();
  const { changeUser } = useContext(UserContext);

  const handleLogin = async () => {
    try {
      User.parse({ password });
      if (password !== confirmPassword) {
        setErrors("Passwords are not the same");
      }
      changeUser(name);
      navigate("/home");
      setErrors(null);
    } catch (err) {
      setErrors(err?.errors?.map((error) => error.message).join(", "));
    }
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
            required
          />
          <input
            placeholder="Password"
            type="password"
            className={styles.input}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <input
            placeholder="Repeat password"
            type="password"
            className={styles.input}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
          <button className={styles.connect} onClick={handleLogin}>
            SignUp
          </button>
          {errors && (
            <div className={styles.error}>
              {errors.split(",").map((error, index) => (
                <div key={index}>{error}</div>
              ))}
            </div>
          )}
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
