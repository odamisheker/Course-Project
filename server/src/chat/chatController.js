const User = require("../auth/models/User");
const Chat = require("./models/Chat");
const Message = require("./models/Message");

class chatController {
  async create(req, res) {
    try {
      req.body = { id_1, id_2, messageInput: {} };
      const user1 = await User.findOne({ _id: id_1 });
      const user2 = await User.findOne({ _id: id_2 });

      const chat = new Chat({
        users: [user1._id, user2._id],
        // ! chatID: // for Egor
        created: Date.now(),
        messages: [], // * мы не можем сюда передать сообщение, так как оно еще не создано, не так ли?
      });

      const message = new Message({
        author: user1._id,
        content: messageInput,
        date: Date.now(),
        lastUploaded: Date.now(),
        users: chat.users,
      });
      chat.messages.push(message);

      await message.save();
      await chat.save();

      return res.json({ message: "Chat successfully created!" });
    } catch (e) {
      console.log(e);
      res.status(400).json({ message: "Chat creation error." });
    }
  }

  async sendMessage(req, res) {
    try {
      req.body = { user_id, chat_id, messageInput };
      const user = await User.findOne({ _id: user_id });
      const chat = await Chat.findOne({ _id: chat_id });

      const message = new Message({
        author: user._id,
        content: messageInput,
        date: Date.now(),
        lastUploaded: Date.now(),
        users: chat.users,
      });
      chat.messages.push(message);

      await message.save();

      return res.json({ message: "Message successfuly sent!" });
    } catch (e) {
      console.log(e);
      return res.status(400).json({ message: "Sending error." });
    }
  }
}

module.exports = new chatController();
