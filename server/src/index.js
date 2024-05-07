const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const authRouter = require("./auth/authRouter");
const searchRouter = require("./search/searchRouter");
const chatRouter = require("./chat/chatRouter");
const PORT = process.env.PORT || 8000;

const app = express();

app.use(express.json());

const io = require("socket.io")(app, {
  cors: {
    origin: "*",
  },
});

// !
const Chat = require("./chat/models/Chat");
// !

const onConnection = (socket) => {
  // выводим сообщение о подключении пользователя
  console.log("User connected");

  // получаем название комнаты из строки запроса "рукопожатия"
  const { chatID } = socket.handshake.query;
  // сохраняем название комнаты в соответствующем свойстве сокета
  socket.roomId = chatID;

  // присоединяемся к комнате (входим в нее)
  socket.join(chatID);

  // регистрируем обработчики
  // обратите внимание на передаваемые аргументы
  // registerMessageHandlers(io, socket);
  // registerUserHandlers(io, socket);
  socket.on("user:add", ({ username }) => {
    io.in(socket.roomId).emit("users", users);
  });

  socket.on("message:get", async () => {
    const chat = await Chat.findOne({
      chatID: chatID,
    });
    const messages = chat.messages;
    io.in(socket.roomId).emit("messages", messages);
  });

  // обрабатываем отключение сокета-пользователя
  socket.on("disconnect", () => {
    // выводим сообщение
    console.log("User disconnected");
    // покидаем комнату
    socket.leave(chatID);
  });
};

io.on("connection", onConnection);
// // * использование cors (?)
// app.use(cors());

app.use("/auth", authRouter);
app.use("/search", searchRouter);
app.use("/chat", chatRouter);

const start = async () => {
  try {
    await mongoose.connect(
      `mongodb+srv://klimov:qwerty123@cluster0.byokuly.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`
    );
    app.listen(PORT, () => console.log(`server started on port ${PORT}`));
  } catch (e) {
    console.log(e);
  }
};

start();
