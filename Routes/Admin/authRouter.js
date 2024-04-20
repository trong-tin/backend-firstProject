const express = require("express");
const router = express.Router();
const controller = require("../../Controllers/Admin/authController");
const validate = require("../../Validates/Admin/authValidate");
router.get("/login", controller.login);
router.post("/login", validate.loginPost, controller.loginPost);
router.get("/logout", controller.logout);
module.exports = router;
