const express = require("express");
const controller = require("../../Controllers/Admin/dasboardController");
const router = express.Router();
router.get("/", controller.dasboard);
module.exports = router;
