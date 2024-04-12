const { Schema, model } = require("mongoose");

const Message = new Schema({
  author: { type: String, required: true, ref: "../../auth/models/User" },
  content: { type: String, required: true },
  date: { type: String, required: true },
  lastUploaded: { type: String, required: true },
  users: [{ type: String, required: true, ref: "../../auth/models/User" }],
});

module.exports = model("Message", Message);
