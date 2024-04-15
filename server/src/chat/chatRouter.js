const Router = require("express");
const controller = require("./chatController");
const router = new Router();

router.get("/chat/messages", controller.getMessages);
router.post("/chat/create", controller.createChat);
router.get("/chat", controller.getChat);

// ! socket io

module.exports = router;
