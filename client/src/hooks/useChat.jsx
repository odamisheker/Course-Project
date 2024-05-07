import { useContext, useEffect, useRef, useState } from "react";

import io from "socket.io-client";
import { nanoid } from "nanoid";
import { UserContext } from "../components/context/UserContextProvider";
import { ChatContext } from "../components/context/ChatContextProvider";

//import { useLocalStorage, useBeforeUnload } from 'hooks'

// требуется перенаправление запросов - смотрите ниже
const SERVER_URL = "http://localhost:8000";

export const useChat = (roomId) => {
  const [users, setUsers] = useState([]);

  const [messages, setMessages] = useState([]);

  // создаем и записываем в локальное хранинище идентификатор пользователя
  //   const [userId] = useLocalStorage('userId', nanoid(8))

  // получаем из локального хранилища имя пользователя
  //   const [username] = useLocalStorage('username')
  const { user } = useContext(UserContext);

  const { chatID } = useContext(ChatContext);

  // useRef() используется не только для получения доступа к DOM-элементам,
  // но и для хранения любых мутирующих значений в течение всего жизненного цикла компонента
  const socketRef = useRef(null);

  useEffect(() => {
    // создаем экземпляр сокета, передаем ему адрес сервера
    // и записываем объект с названием комнаты в строку запроса "рукопожатия"
    // socket.handshake.query.roomId
    socketRef.current = io(SERVER_URL, {
      query: { chatID },
    });

    // отправляем событие добавления пользователя,
    // в качестве данных передаем объект с именем и id пользователя
    /*socketRef.current.emit("user:add", { username }); //!username брать с контекст user

    // обрабатываем получение списка пользователей
    socketRef.current.on("users", (users) => {
      // обновляем массив пользователей
      setUsers(users); // надо сделать на бэке для отдельных комнат
    });*/

    socketRef.current.emit("message:get");

    socketRef.current.on("messages", (messages) => {
      // определяем, какие сообщения были отправлены данным пользователем,
      // если значение свойства "userId" объекта сообщения совпадает с id пользователя,
      // то добавляем в объект сообщения свойство "currentUser" со значением "true",
      // иначе, просто возвращаем объект сообщения
      const newMessages = messages.map((msg) =>
        msg.userId === userId ? { ...msg, currentUser: true } : msg
      );

      setMessages(newMessages);
    });

    return () => {
      socketRef.current.disconnect();
    };
  }, [roomId, userId, username]);

  // принимает объект с текстом сообщения и именем отправителя
  const sendMessage = ({ messageText, senderName }) => {
    // зачем sender name если можно просто username
    // добавляем в объект id пользователя при отправке на сервер
    socketRef.current.emit("message:add", {
      userId,
      messageText,
      senderName,
    });
  };

  // функция удаления сообщения по id
  const removeMessage = (id) => {
    socketRef.current.emit("message:remove", id);
  };

  // отправляем на сервер событие "user:leave" перед перезагрузкой страницы
  //   useBeforeUnload(() => {
  //     socketRef.current.emit("user:leave", userId);
  //   });

  // хук возвращает пользователей, сообщения и функции для отправки удаления сообщений
  return { users, messages, sendMessage, removeMessage };
};
