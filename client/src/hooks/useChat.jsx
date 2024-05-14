import { useContext, useEffect, useRef, useState } from "react";

import io from "socket.io-client";

import { UserContext } from "../components/context/UserContextProvider";
import { ChatContext } from "../components/context/ChatContextProvider";

import { useBeforeUnload } from "./useBeforeUnload";

const SERVER_URL = "http://localhost:8000";

export const useChat = (chatID) => {
  const [users, setUsers] = useState([]);
  const [messages, setMessages] = useState([]);

  const { user } = useContext(UserContext);

  // const { chatID } = useContext(ChatContext);

  const socketRef = useRef(null);

  useEffect(() => {
    socketRef.current = io(SERVER_URL, {
      query: { chatID },
    });

    socketRef.current.emit("user:add", { user });
    socketRef.current.on("users", (users) => {
      setUsers(users);
    });

    socketRef.current.emit("message:get");

    socketRef.current.on("messages", (messages) => {
      const newMessages = messages.map((msg) =>
        msg.author === user
          ? { ...msg, currentUser: true }
          : { ...msg, currentUser: false }
      );

      setMessages(newMessages);
    });

    return () => {
      socketRef.current.disconnect();
    };
  }, [chatID, user]);

  const sendMessage = (messageText, user) => {
    socketRef.current.emit("message:add", {
      messageText,
      user,
    });
  };

  const removeMessageForMe = (_id, user) => {
    socketRef.current.emit("message:removeForMe", { _id, user });
  };

  const removeMessage = (_id) => {
    socketRef.current.emit("message:remove", _id);
  };

  // const editMessage = (id, messageText) => {
  //   socketRef.current.emit("message:edit", { id, messageText });
  // };

  // отправляем на сервер событие "user:leave" перед перезагрузкой страницы
  useBeforeUnload(() => {
    socketRef.current.emit("user:leave", user);
  });

  return [
    // users,
    messages,
    sendMessage,
    // editMessage,
    removeMessageForMe,
    removeMessage,
  ];
};
