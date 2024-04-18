const express = require("express");
const router = express.Router();
const controller = require("../../Controllers/Admin/rolesController");
router.get("/", controller.index);
router.get("/create", controller.create);
router.post("/create", controller.createPost);
router.get("/permission", controller.permission);
router.patch("/permission", controller.permissionPatch);

module.exports = router;
