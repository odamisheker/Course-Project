const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const authRouter = require("./routers/authRouter");
const searchRouter = require("./routers/searchRouter");
const chatRouter = require("./routers/chatRouter");
const onConnection = require("./handlers/onConnection");
const ioMiddleware = require("./middlewares/ioMiddleware");
const http = require("http");

const PORT = process.env.PORT || 8000;

const app = express();
app.use(express.json());
app.use(cors());
const server = http.createServer(app);

const io = require("socket.io")(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["*"],
    transports: ["websocket", "polling"],
    credentials: true,
  },
  allowEIO3: true,
});

io.use(ioMiddleware);
io.on("connection", (socket) => {
  onConnection(io, socket);
});

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
