const Router = require("express");
const controller = require("./searchController");
const router = new Router();

router.post("/search", controller.findByUsername);

// ! нужен ли middleware

module.exports = router;
