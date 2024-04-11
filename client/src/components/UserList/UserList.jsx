import User from "../User/User";
//import chats from "../../DB";
import { useContext } from "react";
import { UserContext } from "../context/UserContextProvider";

export default function UserList({ users }) {
  //TODO onClick -> changeId in Context => change WindowChat

  //const { user } = useContext(UserContext);

  return (
    <div>
      {users.map((e, i) => (
        <User key={i} name={e.username} />
      ))}
    </div>
  );
}
