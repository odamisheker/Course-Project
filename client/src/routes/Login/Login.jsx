import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../components/context/UserContextProvider";
import { apiClient } from "../../api";
import Cookies from "js-cookie";
import styles from "./Login.module.css";
import { SHA256 } from "../../algorithms/SHA256/sha256";
import { generateAESKey } from "../../algorithms/AES/utils/generateKey";
import { generateKeyPair } from "../../algorithms/RSA/utils/generateKeyPair";

export default function Login() {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState();

  const navigate = useNavigate();
  const { changeUser } = useContext(UserContext);

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleLogin();
    }
  };

  const handleLogin = async () => {
    if (name.trim() === "" || password.trim() === "") return;
    try {
      const salt = await apiClient.getSalt({ username: name.trim() });
      console.log("salt", salt);
      console.log("type", typeof(salt))

      const PreHashedPassword = password.concat(salt.data.salt);
      const hashedPassword = SHA256(PreHashedPassword);
  
      const res = await apiClient.checkUser({
        username: name.trim(),
        password: hashedPassword.trim(),
      });
      console.log(res.data);

      const AESkey = generateAESKey(password, salt.data.salt);
      const RSAPair = generateKeyPair();

      console.log("RSA Pair", RSAPair, typeof(RSAPair));
      console.log("AESKey", AESkey, typeof(AESkey));

      Cookies.set("token", res.data.token);
      Cookies.set("AESkey", AESkey);
      Cookies.set("RSAKeyPair", RSAPair);

      changeUser(res.data.username);
      navigate("/chat");
    } catch (e) {
      console.error(e);
      setError(e.response?.data?.message || "Login error");
    }
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
          />
          <input
            placeholder="password"
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
            Sign In
          </button>

          <p onClick={() => navigate("/signup")} className={styles.navigate}>
            don't have account - sign up
          </p>
        </div>
        <div className={styles.error}>{"" || <div>{error}</div>}</div>
      </div>
    </div>
  );
}
