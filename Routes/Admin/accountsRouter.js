const express = require("express");
const multer = require("multer");
const router = express.Router();
const validate = require("../../Validates/Admin/accountValidate");
const upload = multer();
const controller = require("../../Controllers/Admin/accountController");
const uploadCloud = require("../../middlewares/Admin/uploadCloudMiddleware");

router.get("/", controller.index);
router.get("/create", controller.create);

router.post(
  "/create",
  upload.single("avatar"),
  uploadCloud.upload,
  validate.createPost,
  controller.createPost
);

router.get(
  "/edit/:id",
  upload.single("avatar"),
  uploadCloud.upload,
  validate.createPost,
  controller.edit
);

router.patch(
  "/edit/:id",
  upload.single("avatar"),
  uploadCloud.upload,
  validate.editPatch,
  controller.editPatch
);
module.exports = router;
