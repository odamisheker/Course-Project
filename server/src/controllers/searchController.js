const User = require("../models/User");

class searchController {
  async findByUsername(req, res) {
    try {
      const { searchInput } = req.body;

      const regex = new RegExp(searchInput, "i"); // regular expression

      const searchedUsers = await User.find({ username: { $regex: regex } });

      if (searchedUsers.length === 0) {
        return res
          .status(400)
          .json({ message: "User with this name not found." });
      }
      const searchedUsersNames = searchedUsers.map((user) => ({
        name: user.username,
      }));

      return res.json(searchedUsersNames);
    } catch (e) {
      console.log(e);
      res.status(400).json({ message: "Search error." });
    }
  }

  // async findChat(req, res) {
  //   try {
  //   } catch (e) {
  //     console.log(e);
  //   }
  // }
}

module.exports = new searchController();
