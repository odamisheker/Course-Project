import { createContext, useState, useEffect } from "react";

export const UserContext = createContext(null);

export default function UserContextProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const user = sessionStorage.getItem("user");
    // setUser(user);
    if (user) {
      setUser(user);
      setLoading(false);
    } else setLoading(false);
    //   if (id) {
    //     fetch(`http://localhost:5001/users?id=${id}`)
    //       .then((r) => r.json())
    //       .then((users) => users[0])
    //       .then((user) => {
    //         setUser(user);
    //         setLoading(false);
    //       });
    //   } else setLoading(false);
  }, []);

  useEffect(() => {
    if (user) {
      sessionStorage.setItem("user", user);
    }
  }, [user]);

  return (
    <UserContext.Provider value={{ user, changeUser: setUser, loading }}>
      {children}
    </UserContext.Provider>
  );
}
