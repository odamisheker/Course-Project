const Router = require("express");
const controller = require("../controllers/authController");
const router = new Router();
const { check } = require("express-validator");
// const authMiddleware = require("./middleware/authMiddleware");
const roleMiddleware = require("../middlewares/roleMiddleware");

router.post(
  "/registration",
  [
    check("username", "Username cannot be empty").notEmpty(),
    // check("publicname", "Username cannot be empty").notEmpty(),
    // ! Аналогичные требования как и на фронт
    check("password", "Пароль не может быть пустым 4 min 10 max").isLength({
      min: 4,
      max: 10,
    }),
  ],
  controller.registration
);
router.get("/users", roleMiddleware(["ADMIN"]), controller.getUsers);
router.post("/login", controller.login);
router.post("/chats", controller.getChats);

module.exports = router;
