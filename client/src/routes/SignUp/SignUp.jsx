import { useContext, useState } from "react";

import axios from "axios";

import { useNavigate } from "react-router-dom";
import { UserContext } from "../../components/context/UserContextProvider";

import { User } from "../../utils/validation";
import styles from "./SignUp.module.css";
<<<<<<< HEAD
import { decrypting } from "../../algorithms/RSA/decrypt";
import { apiClient } from "../../api";
=======
>>>>>>> 1de77d4c84f14dad096022c1fc0c553ecf74e4f5

export default function SignUp() {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [errors, setErrors] = useState("");

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
    } catch (err) {
      setErrors(err?.errors?.map((error) => error.message).join(". "));
      return;
    }

    apiClient
      .addUser({
        username: name,
        password: password,
      })
      .then((res) => {
        changeUser(name);
        navigate("/chat");
        setErrors(null);
      })
      .catch((e) => {
        // console.log(e);
        setErrors(e.response.data.message);
      });
  };

  return (
    <div className={styles.main}>
      <div className={styles.wrapper}>
        <h1 className={styles.title}>SESSION</h1>
        <div className={styles.block}>
          <input
            placeholder="login"
            className={styles.input}
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <input
            placeholder="password"
            type="password"
            className={styles.input}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <input
            placeholder="repeat password"
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
          <p onClick={() => navigate("/login")} className={styles.navigate}>
            Already have account?
          </p>
        </div>
        <div className={styles.error}>{"" || errors}</div>
      </div>
    </div>
  );
<<<<<<< HEAD
  //console.log(decrypting());
=======
>>>>>>> 1de77d4c84f14dad096022c1fc0c553ecf74e4f5
}
