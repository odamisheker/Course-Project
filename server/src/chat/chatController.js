const User = require("../auth/models/User");
const Chat = require("./models/Chat");
const Message = require("./models/Message");
const generateCode = require("../algorithms/generateCode");

class chatController {
  async getMessages(req, res) {
    // * возможно не нужно
    try {
      const { username1, username2 } = req.body;

      const chat = await Chat.findOne({
        users: { $all: [username1, username2] },
      });
      if (!chat) {
        return res.json({ message: "Chat not exists." });
      }

      return res.status(200).json({ messages: chat.messages });
    } catch (e) {
      console.log(e);
      return res.status(400).json({ message: "Get messages error." });
    }
  }

  async createChat(req, res) {
    try {
      const { username1, username2 } = req.body;
      const user1 = await User.findOne({ username: username1 });
      const user2 = await User.findOne({ username: username2 });

      // const message = new Message({
      //   author: user1.username,
      //   content: messageInput,
      //   date: Date.now(),
      //   lastUploaded: Date.now(),
      //   users: [user1.username, user2.username],
      // });

      const chat = new Chat({
        chatname: `${user1.username} & ${user2.username}`,
        users: [user1.username, user2.username],
        chatID: generateCode(),
        created: Date.now(),
        messages: [],
      });

      //await message.save();
      await chat.save();

      return res.json({ chatID: chat.chatID });
    } catch (e) {
      console.log(e);
      return res.status(400).json({ message: "Chat creation error." });
    }
  }

  async sendMessage(req, res) {
    try {
      const { username, chatID, messageInput } = req.body;
      const user = await User.findOne({ username: username });
      const chat = await Chat.findOne({ chatID: chatID });

      const message = new Message({
        author: user.username,
        content: messageInput,
        date: Date.now(),
        lastUploaded: Date.now(),
        users: chat.users,
      });
      chat.messages.push(message);

      await message.save();
      await chat.save();
      // * update chat?

      return res.json({ message: "Message successfuly sent!" });
    } catch (e) {
      console.log(e);
      return res.status(400).json({ message: "Sending error." });
    }
  }

  async deleteMessageForMe(req, res) {
    // ! message_id --> anything else
    // ! chat_id --> chatID
    // ! user_id --> username
    try {
      const { user_id, chat_id, message_id } = req.body;
      const user = await User.findOne({ _id: user_id });
      const chat = await Chat.findOne({ _id: chat_id });
      const message = await Message.findOne({ _id: message_id });

      message.users.splice(message.users.indexOf(user_id), 1);
      await message.save();
      await chat.save();

      return res.json({ message: "Message successfully deleted for you!" });
    } catch (e) {
      console.log(e);
      return res.status(400).json({ message: "Delete error." });
    }
  }

  async deleteMesssageForAll(req, res) {
    // ! message_id --> anything else
    // ! chat_id --> chatID
    try {
      const { chat_id, message_id } = req.body;
      const chat = await Chat.findOne({ _id: chat_id });

      await Message.deleteOne({ _id: message_id });

      await chat.save();

      return res.json({ message: "Message successfully deleted for all!" });
    } catch (e) {
      console.log(e);
      return res.status(400).json({ message: "Delete error." });
    }
  }

  async editMessage(req, res) {
    // ! message_id --> anything else
    // ! chat_id --> chatID
    try {
      const { chat_id, message_id, newContent } = req.body;
      const chat = await Chat.findOne({ _id: chat_id });
      const message = await Message.findOne({ _id: message_id });

      message.content = newContent;
      message.lastUploaded = Date.now();
      await message.save();
      await chat.save();

      return res.json({ message: "Message successfully edited!" });
    } catch (e) {
      console.log(e);
      return res.status(400).json({ message: "Edit error." });
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

  async deleteChat(req, res) {
    try {
      const { chatID } = req.body;
      const chat = await Chat.findOne({ chatID: chatID });

      if (!chat) {
        return res.json({
          message: "Chat has been already deleted or not exists.",
        });
      }

      chat.deleteOne();

      return res.json({ message: "Chat successfully deleted." });
    } catch (e) {
      console.log(e);
      return res.status(400).json({ meessage: "Chat delete error." });
    }
  }

  // group chat
}

module.exports = new chatController();
