const { Schema, model } = require("mongoose");

const Chat = new Schema({
  chatname: { type: String, required: true },
  users: [{ type: String, required: true, ref: "User" }],
  chatID: { type: String, unique: true, required: true },
  created: { type: String, required: true },
  messages: [
    new Schema({
      author: { type: String, required: true, ref: "User" },
      content: { type: Array, required: true },
      date: { type: String, required: true },
      lastUploaded: { type: String, required: true },
      users: [{ type: String, required: true, ref: "User" }],
    }),
  ],
});

module.exports = model("Chat", Chat);
