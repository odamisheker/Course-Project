import { createContext, useState } from "react";

export const UserContext = createContext(null);

export default function UserContextProvider({ children }) {
  const [user, setUser] = useState(null);
  const [id, setId] = useState(null);

  return (
    <UserContext.Provider
      value={{ user, changeUser: setUser, id, changeId: setId }}
    >
      {children}
    </UserContext.Provider>
  );
}
