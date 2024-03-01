import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../components/UserContextProvider";

export default function Login() {
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
    <>
      <h2>Login</h2>
      <input
        placeholder="name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        placeholder="password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleLogin}>Submit</button>
      <button onClick={() => navigate("/signup")}>
        Don't have account - sign up!
      </button>
    </>
  );
}
