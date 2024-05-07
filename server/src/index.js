const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const authRouter = require("./auth/authRouter");
const searchRouter = require("./search/searchRouter");
const chatRouter = require("./chat/chatRouter");
const http = require("http");
const PORT = process.env.PORT || 8000;

const app = express();

app.use(express.json());

const server = http.createServer(app); // Создаем сервер для Express

const io = require("socket.io")(server, {
  cors: {
    origin: "*",
  },
});
app.use(cors());
// !
const Chat = require("./chat/models/Chat");
// !

// const onConnection = (socket) => {
//   console.log("User connected");

//   const { chatID } = socket.handshake.query;
//   socket.roomId = chatID;

//   socket.join(chatID);

//   socket.on("message:get", async () => {
//     const chat = await Chat.findOne({
//       chatID: chatID,
//     });
//     console.log(chat);
//     const messages = chat.messages;
//     io.in(socket.roomId).emit("messages", messages);
//   });

//   socket.on("disconnect", () => {
//     console.log("User disconnected");
//     socket.leave(chatID);
//   });
// };

// io.on("connection", onConnection);

app.use("/auth", authRouter);
app.use("/search", searchRouter);
app.use("/chat", chatRouter);

const start = async () => {
  try {
    await mongoose.connect(
      `mongodb+srv://klimov:qwerty123@cluster0.byokuly.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`
    );
    server.listen(PORT, () => console.log(`Server started on port ${PORT}`)); // Используем server.listen для запуска сервера
  } catch (e) {
    console.log(e);
  }
};

start();
