import { useContext, useEffect, useRef, useState } from "react";

import io from "socket.io-client";

import { UserContext } from "../components/context/UserContextProvider";
import { ChatContext } from "../components/context/ChatContextProvider";

import { useBeforeUnload } from "./useBeforeUnload";

// требуется перенаправление запросов - смотрите ниже
const SERVER_URL = "http://localhost:8000";

export const useChat = (chatID) => {
  const [users, setUsers] = useState([]);
  const [messages, setMessages] = useState([]);

  const { user } = useContext(UserContext);

  const socketRef = useRef(null);

  useEffect(() => {
    socketRef.current = io(SERVER_URL, {
      query: { chatID },
    });

    // отправляем событие добавления пользователя,
    // в качестве данных передаем объект с именем и id пользователя
    socketRef.current.emit("user:add", { user }); //!username брать с контекст user

    socketRef.current.on("users", (users) => {
      setUsers(users); //! надо сделать на бэке для отдельных комнат
    });

    socketRef.current.emit("message:get");

    socketRef.current.on("messages", (messages) => {
      // определяем, какие сообщения были отправлены данным пользователем,
      // если значение свойства "userId" объекта сообщения совпадает с id пользователя,
      // то добавляем в объект сообщения свойство "currentUser" со значением "true",
      // иначе, просто возвращаем объект сообщения
      // const newMessages = messages.map((msg) =>
      //   msg.userID === user ? { ...msg, currentUser: true } : msg
      // );

      setMessages(messages);
    });

    return () => {
      socketRef.current.disconnect();
    };
  }, [chatID, user]);

  // принимает объект с текстом сообщения и именем отправителя
  const sendMessage = (messageText, user) => {
    // зачем sender name если можно просто username
    // добавляем в объект id пользователя при отправке на сервер
    socketRef.current.emit("message:add", {
      messageText,
      user,
    });
  };

  // функция удаления сообщения по id
  // const removeMessageForMe = (id) => {
  //   socketRef.current.emit("message:removeForMe", id);
  // };return { users, messages, sendMessage, editMessage, removeMessageForMe, removeMessage };
  // const removeMessage = (id) => {
  //   socketRef.current.emit("message:remove", id);
  // };

  // const editMessage = (id, messageText) => {
  //   socketRef.current.emit("message:edit", { id, messageText });
  // };

  // отправляем на сервер событие "user:leave" перед перезагрузкой страницы
  useBeforeUnload(() => {
    socketRef.current.emit("user:leave", user);
  });

  // хук возвращает пользователей, сообщения и функции для отправки удаления сообщений
  return [
    // users,
    messages,
    sendMessage,
    // editMessage,
    // removeMessageForMe,
    // removeMessage,
  ];
  //return { messages};
};
