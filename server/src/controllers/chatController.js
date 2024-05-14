const User = require("../models/User");
const Chat = require("../models/Chat");
const generateCode = require("../algorithms/generateCode");

class chatController {
  async createChat(req, res) {
    try {
      const { username1, username2 } = req.body;
      const user1 = await User.findOne({ username: username1 });
      const user2 = await User.findOne({ username: username2 });

      const chat = new Chat({
        chatname: `${user1.username} & ${user2.username}`,
        users: [user1.username, user2.username],
        chatID: generateCode(),
        created: Date.now(),
        messages: [],
      });

      await chat.save();

      return res.json({
        message: "Chat successfully created.",
        chatID: chat.chatID,
      });
    } catch (e) {
      console.log(e);
      return res.status(400).json({ message: "Chat creation error." });
    }
  }

  async getChat(req, res) {
    try {
      const { username1, username2 } = req.body;
      const chat = await Chat.findOne({
        users: { $all: [username1, username2] },
      });

      if (!chat) {
        return res.status(400).json({ message: "Chat not exists." });
      }

      return res.json({ chatID: chat.chatID });
    } catch (e) {
      console.log(e);
      return res.status(400).json({ message: "Get chat error." });
    }
  }
}

module.exports = new chatController();
