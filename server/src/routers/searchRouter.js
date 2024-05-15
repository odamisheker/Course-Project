const Router = require("express");
const controller = require("../controllers/searchController");
const authMiddleware = require("../middlewares/authMiddleware");
const router = new Router();

router.post("/get", authMiddleware, controller.findByUsername);

// ! нужен ли middleware

module.exports = router;
