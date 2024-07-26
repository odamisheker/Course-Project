// onConnection.js
const registerMessageHandlers = require("./messageHandlers");

const onConnection = (io, socket) => {
  const { chatID } = socket.handshake.query;
  socket.roomId = chatID;
  socket.join(chatID);
  console.log("User connected");

  registerMessageHandlers(io, socket);
};

module.exports = onConnection;
