import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../components/context/UserContextProvider";

export default function Home() {
  const [id, setId] = useState("");
  const [errors, setErrors] = useState(null);

  const { user, changeId } = useContext(UserContext);

  const navigate = useNavigate();

  const handleGo = () => {
    //  fetch...
    //  if true then go
    changeId(id);
    navigate("/chat");
  };

  return (
    <>
      <h2>Hello, {user}!</h2>
      <input
        placeholder="chat id"
        value={id}
        onChange={(e) => setId(e.target.value)}
      />
      <button onClick={handleGo}>Go to chat!</button>
      <button>Create chat!</button>
      <div>{a}</div>
    </>
  );
}
