const Router = require("express");
const controller = require("../controllers/chatController");
const authMiddleware = require("../middlewares/authMiddleware");
const router = new Router();

router.post("/chat/create", /*authMiddleware,*/ controller.createChat);
router.post("/chat", /* authMiddleware,*/ controller.getChat);

module.exports = router;
