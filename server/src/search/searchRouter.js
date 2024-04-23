const Router = require("express");
const controller = require("./searchController");
const authMiddleware = require("../auth/middleware/authMiddleware");
const router = new Router();

router.post("/get", /*authMiddleware,*/ controller.findByUsername);

// ! нужен ли middleware

module.exports = router;
