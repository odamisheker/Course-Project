//const io = require("socket.io");
const registerMessageHandlers = require("./messageHandlers");

const onConnection = (socket) => {
  const { chatID } = socket.handshake.query;
  socket.roomId = chatID;
  console.log(socket);
  socket.join(chatID);
  console.log("User connected");

  registerMessageHandlers(io, socket);
  // * registerUserHandlers(io, socket);

  //   socket.on("message:get", async () => {
  //     const chat = await Chat.findOne({
  //       chatID: chatID,
  //     });
  //     console.log(chat);
  //     const messages = chat.messages;
  //     io.in(socket.roomId).emit("messages", messages);
  //   });

  // socket.on("disconnect", () => {
  //   console.log("User disconnected");
  //   socket.leave(chatID);
  // });
};

module.exports = onConnection;
