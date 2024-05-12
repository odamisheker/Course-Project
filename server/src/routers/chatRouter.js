const Router = require("express");
const controller = require("../controllers/chatController");
const authMiddleware = require("../middlewares/authMiddleware");
const router = new Router();

router.get("/chat/messages", authMiddleware, controller.getMessages);
router.post("/chat/create", /*authMiddleware,*/ controller.createChat);
router.post("/chat", /* authMiddleware,*/ controller.getChat);

// ! socket io

module.exports = router;
