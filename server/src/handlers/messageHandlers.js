const Chat = require("../models/Chat");

module.exports = (io, socket) => {
  const getMessages = async () => {
    console.log(socket.roomId);

    const chat = await Chat.findOne({
      chatID: socket.roomId,
    });

    // console.log(chat);

    const messages = chat.messages;

    io.in(socket.roomId).emit("messages", messages);
  };

  const sendMessage = async (message) => {
    const chat = await Chat.findOne({ chatID: socket.roomId });
    // console.log(chat);
    // console.log(message);

    chat.messages.push({
      date: Date.now(),
      author: message.user,
      content: message.messageText,
      users: chat.users,
      lastUploaded: Date.now(),
    });

    await chat.save();

    getMessages();
  };

  const removeMessage = async (_id) => {
    const chat = await Chat.findOne({ chatID: socket.roomId });

    chat.messages.splice(
      chat.messages.findIndex((message) => message._id == _id),
      1
    );

    await chat.save();

    getMessages();
  };

  const removeMessageForMe = async (data) => {
    const chat = await Chat.findOne({ chatID: socket.roomId });

    // console.log(data.user);
    const index = chat.messages.findIndex((message) => message._id == data._id);

    // console.log(index);
    // console.log(chat.messages[index].users.indexOf(data.user));

    chat.messages[index].users.splice(
      chat.messages[index].users.indexOf(data.user),
      1
    );

    await chat.save();

    getMessages();
  };

  //   const removeChat = async () => {
  //     const chat = await Chat.findOneAndDelete({ chatID: socket.roomId });
  //   };

  // регистрируем обработчики
  socket.on("message:get", getMessages);
  socket.on("message:add", sendMessage);
  socket.on("message:remove", removeMessage);
  socket.on("message:removeForMe", removeMessageForMe);
  //   socket.on("message:removeChat", removeChat);
};
