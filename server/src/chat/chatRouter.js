const Router = require("express");
const controller = require("./chatController");
const authMiddleware = require("../auth/middleware/authMiddleware");
const router = new Router();

router.get("/chat/messages", authMiddleware, controller.getMessages);
router.post("/chat/create", /*authMiddleware,*/ controller.createChat);
router.post("/chat", /* authMiddleware,*/ controller.getChat);

// ! socket io

module.exports = router;
