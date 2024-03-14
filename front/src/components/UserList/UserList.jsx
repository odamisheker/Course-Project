import { useState } from "react";
import User from "../User/User";
import ContextMenu from "../ContextMenu/ContextMenu";

export default function UserList({ users }) {
  //TODO onClick -> changeId => change WindowChat

  return (
    <div>
      {users.map((e, i) => (
        <User key={i} name={e} />
      ))}
    </div>
  );
}
