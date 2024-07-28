const Router = require("express");
const controller = require("../controllers/authController");
const router = new Router();
const roleMiddleware = require("../middlewares/roleMiddleware");

router.post("/registration", controller.registration);
router.get("/users", roleMiddleware(["ADMIN"]), controller.getUsers);
// router.post("/login", controller.login);
router.post("/chats", controller.getChats);
router.post("/salt", controller.getSalt);
router.post("/login", controller.Login);

module.exports = router;
