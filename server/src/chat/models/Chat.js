const { Schema, model } = require("mongoose");

const Chat = new Schema({
  chatname: { type: String, required: true, default: "" },
  users: [{ type: String, required: true, ref: "../../auth/models/User" }],
  //chatID: { type: String, unique: true, required: true },
  created: { type: String, required: true },
  messages: [{ type: String, ref: "Message" }],
});

module.exports = model("Chat", Chat);
