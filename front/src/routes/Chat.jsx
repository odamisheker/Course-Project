import { useContext, useState } from "react";
import { UserContext } from "../components/UserContextProvider";

export default function Chat() {
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState(null);

  const { id } = useContext(UserContext);
  const handleSend = () => {
    //  validate message
    //  post
    //  output on screen
  };
  return (
    <>
      <h2>ChatID {id}</h2>
      <div>
        <div></div>
        <input
          placeholder="your message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button>Send</button>
      </div>
    </>
  );
}
