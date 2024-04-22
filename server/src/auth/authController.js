const User = require("./models/User");
const Role = require("./models/Role");
const bcrypt = require("bcryptjs");
const { validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
const { secret } = require("./config");

const generateAccessToken = (id, roles) => {
  const payload = {
    id,
    roles,
  };
  return jwt.sign(payload, secret, { expiresIn: "24h" });
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
      const { username, password, publicname } = req.body;
      const candidate = await User.findOne({ username });
      if (candidate) {
        return res
          .status(400)
          .json({ message: "A User with the same name already exists." });
      }
      const hashPassword = bcrypt.hashSync(password, 4);
      const userRole = await Role.findOne({ value: "USER" });
      const user = new User({
        username,
        publicname,
        password: hashPassword,
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
      return res.json({ token, publicname: user.publicname });
    } catch (e) {
      console.log(e);
      res.status(400).json({ message: "Login error." });
    }
  }

  async getUsers(req, res) {
    try {
      const users = await User.find();
      res.json(users);
    } catch (e) {}
  }
}

module.exports = new authController();
