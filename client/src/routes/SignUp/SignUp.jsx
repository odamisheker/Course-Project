import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../components/context/UserContextProvider";
import { User } from "../../utils/validation";
import styles from "./SignUp.module.css";
import { apiClient } from "../../api";
import { SHA256 } from "../../algorithms/SHA256/sha256";
import { generateSalt } from "../../algorithms/SHA256/Salt";

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

    const salt = generateSalt();
    const PreHashedPassword = password.concat(salt)

    console.log("hashed password", PreHashedPassword)
    console.log(salt);

    if (salt === PreHashedPassword) {
      console.log("same")
    }

    apiClient
      .addUser({
        username: name,
        password: SHA256(PreHashedPassword),
        salt: salt,
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
}
