const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const authRouter = require("./auth/authRouter");
const searchRouter = require("./search/searchRouter");
const PORT = process.env.PORT || 8000;

const app = express();

app.use(express.json());
// * использование cors (?), можно ли по-другому? и надо ли иначе...
app.use(cors());
app.use("/auth", authRouter);

// ! что с этим не так? или все норм
app.use(searchRouter);

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

// ? никита, было бы круто, если бы ты объяснил,
// ? что представляет вот эта хренатень и для чего она тут)
// app.get("/", (req, res) => {
//   res.send({ express: "YOUR EXPRESS BACKEND IS CONNECTED TO REACT" }); //Строка 10
// });
