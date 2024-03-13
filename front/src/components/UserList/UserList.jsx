import { useState } from "react";
import User from "../User/User";
import ContextMenu from "../ContextMenu/ContextMenu";

export default function UserList() {
  //TODO load users, onClick -> changeId => change WindowChat
  const [users, setUsers] = useState([1, 2, 3, 4, 5, 6, 7, 8]);

  return (
    <div>
      {users.map((e, i) => (
        <User key={i} />
      ))}
    </div>
  );
}
