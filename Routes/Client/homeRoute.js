const express = require("express");
const controller = require("../../Controllers/Client/homeController");
const router = express.Router();
router.get("/", controller.index);
module.exports = router;
