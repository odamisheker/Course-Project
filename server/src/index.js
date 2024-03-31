const express = require("express");
const mongoose = require("mongoose");
const authRouter = require("./auth/authRouter");
const PORT = process.env.PORT || 8000;

const app = express();

app.use(express.json());
app.use("/auth", authRouter);

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

app.get("/", (req, res) => {
  res.send({ express: "YOUR EXPRESS BACKEND IS CONNECTED TO REACT" }); //Строка 10
});
