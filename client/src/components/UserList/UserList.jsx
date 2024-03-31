import User from "../User/User";
import chats from "../../DB";
import { useContext } from "react";
import { UserContext } from "../context/UserContextProvider";

export default function UserList({ users }) {
  //TODO onClick -> changeId in Context => change WindowChat

  const { user } = useContext(UserContext);
  const chastToView = chats.filter((i) => i.userId == user);
  return (
    <div>
      {chastToView.map((e, i) => (
        <User
          key={i}
          name={e.id}
          lastMessage={
            e.messages.length > 0 ? e.messages[e.messages.length - 1].text : ""
          }
        />
      ))}
    </div>
  );
}
