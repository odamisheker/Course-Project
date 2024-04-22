const Router = require("express");
const controller = require("./searchController");
const authMiddleware = require("../auth/middleware/authMiddleware");
const router = new Router();

router.post("/get", controller.findByUsername);

// ! нужен ли middleware

module.exports = router;
