// ! work for slave Danik

import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../../components/UserContextProvider";
import { User } from "../../utils/validation";
import styles from "./SignUp.module.css";

export default function SignUp() {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState(null);

  const navigate = useNavigate();
  const { changeUser } = useContext(UserContext);

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSignUp();
    }
  };

  const handleSignUp = async () => {
    try {
      User.parse({ password });
      if (password !== confirmPassword) {
        setErrors("Passwords are not the same");
        return;
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
      <h1 className={styles.title}>SESSION</h1>
      <div className={styles.wrapper}>
        <div className={styles.desc}>Non-anonymous use:</div>
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
          <button
            className={styles.connect}
            onClick={handleSignUp}
            onKeyUp={handleKeyPress}
          >
            Sign Up
          </button>
          {errors && (
            <div className={styles.error}>
              {errors.split(",").map((error, index) => (
                <div key={index}>{error}</div>
              ))}
            </div>
          )}
        </div>
        <Link to="/login" className={styles.navigate}>
          Already have account?
        </Link>
      </div>
    </div>
  );
}
