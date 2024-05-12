const Chat = require("../models/Chat");

module.exports = (io, socket) => {
  const getMessages = async () => {
    console.log(socket.roomId);

    const chat = await Chat.findOne({
      chatID: socket.roomId,
    });

    console.log(chat);

    const messages = chat.messages;

    io.in(socket.roomId).emit("messages", messages);
  };

  const sendMessage = async (message, username) => {
    const chat = await Chat.findOne({ chatID: socket.roomId });

    chat.messages.push({
      author: username,
      content: message,
      date: Date.now(),
      lastUploaded: Date.now(),
      users: chat.users,
    });

    await chat.save();

    getMessages();
  };

  // обрабатываем удаление сообщение
  // функция принимает id сообщения
  // ToDO:
  //   const removeMessage = (messageId) => {
  //     db.get("messages").remove({ messageId }).write();

  //     getMessages();
  //   };

  // регистрируем обработчики
  socket.on("message:get", getMessages);
  socket.on("message:add", sendMessage);
  //   socket.on("message:remove", deleteMessage);
  //   socket.on("message:removeForMe", deleteMessageForMe);
  // ToDo: socket.on("message:edit", editMessage);
};
