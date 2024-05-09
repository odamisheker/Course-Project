import { createContext, useState } from "react";

export const ChatContext = createContext(null);

export default function ChatContextProvider({ children }) {
  // const [user, setUser] = useState(null);
  // const [id, setId] = useState(null);

  // return (
  //   <ChatContext.Provider
  //     value={{ chatID: id, changeChatID: setId }} //user, changeUser: setUser,
  //   >
  //     {children}
  //   </ChatContext.Provider>
  // );

  const [chat, setChat] = useState({ chatID: null, chatname: null });

  return (
    <ChatContext.Provider
      value={{ chat, changeChat: setChat }} //user, changeUser: setUser,
    >
      {children}
    </ChatContext.Provider>
  );
}
