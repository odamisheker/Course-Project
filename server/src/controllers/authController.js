const User = require("../models/User");
const Role = require("../models/Role");
const Chat = require("../models/Chat");
const bcrypt = require("bcryptjs");
const { validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
const { secret } = require("../config");

const generateAccessToken = (id, roles) => {
  const payload = {
    id,
    roles,
  };
  return jwt.sign(payload, secret, { expiresIn: "1h" });
};

class authController {
  async registration(req, res) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          message: "There was an error somewhere during registration.",
          errors,
        });
      }
      const { username, password, salt } = req.body;
      const candidate = await User.findOne({ username });
      if (candidate) {
        return res
          .status(400)
          .json({ message: "A User with the same name already exists." });
      }
      // const hashPassword = bcrypt.hashSync(password, 4);
      const userRole = await Role.findOne({ value: "USER" });
      const user = new User({
        username: username,
        password: password,
        salt: salt,
        roles: [userRole.value],
      });
      await user.save();
      return res.json({ message: "User successfully registered!" });
    } catch (e) {
      console.log(e);
      res.status(400).json({ message: "Registration error." });
    }
  }

  async login(req, res) {
    try {
      const { username, password } = req.body;
      const user = await User.findOne({ username });
      if (!user) {
        return res
          .status(400)
          .json({ message: "There is no user with that username." });
      }
      const validPassword = bcrypt.compareSync(password, user.password);
      if (!validPassword) {
        return res.status(400).json({ message: "Incorrect password." });
      }
      const token = generateAccessToken(user._id, user.roles);
      return res.json({ token, username: user.username });
    } catch (e) {
      console.log(e);
      res.status(400).json({ message: "Login error." });
    }
  }

  async getChats(req, res) {
    try {
      const { username } = req.body;

      const chats = await Chat.find({ users: username });

      const chatsData = chats.map((chat) => {
        return { chatID: chat.chatID, name: chat.chatname };
      });

      return res.json(chatsData);
    } catch (e) {
      console.log(e);
      return res.status(400).json({ message: "Get chats error." });
    }
  }

  async getUsers(req, res) {
    const users = await User.find();
    res.json(users);
  }
}

module.exports = new authController();
