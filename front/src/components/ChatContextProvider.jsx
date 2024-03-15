import { createContext, useState } from "react";

export const ChatContext = createContext(null);

export default function ChatContextProvider({ children }) {
  // const [user, setUser] = useState(null);
  const [id, setId] = useState(null);

  return (
    <ChatContext.Provider
      value={{ id, changeId: setId }} //user, changeUser: setUser,
    >
      {children}
    </ChatContext.Provider>
  );
}
