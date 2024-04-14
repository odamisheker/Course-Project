const Router = require("express");
const controller = require("./chatController");
const router = new Router();

router.get("/chat/messages", controller.getMessages);
router.post("/chat/create", controller.createChat);

// ! socket io

module.exports = router;
