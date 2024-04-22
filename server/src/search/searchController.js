const User = require("../auth/models/User");

class searchController {
  async findByUsername(req, res) {
    try {
      const { searchInput } = req.body;

      // ! переписать, чтобы отдавало массив пользователей

      const searchedUser = await User.findOne({ publicname: searchInput });

      if (!searchedUser) {
        return res
          .status(400)
          .json({ message: "User with this name not found." });
      }

      return res.json([{ publicname: searchedUser.publicname }]);
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
