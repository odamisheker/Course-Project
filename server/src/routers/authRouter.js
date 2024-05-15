const Router = require("express");
const controller = require("../controllers/authController");
const router = new Router();
const roleMiddleware = require("../middlewares/roleMiddleware");

router.post("/registration", controller.registration);
router.get("/users", roleMiddleware(["ADMIN"]), controller.getUsers);
router.post("/login", controller.login);
router.post("/chats", controller.getChats);

module.exports = router;
