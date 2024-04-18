const express = require("express");
const multer = require("multer");
const router = express.Router();

const upload = multer();
const controller = require("../../Controllers/Admin/productCategoryController");
const validate = require("../../Validates/Admin/producCategorytValidate");
const uploadCloud = require("../../middlewares/Admin/uploadCloudMiddleware");

router.get("/", controller.index);

router.get("/create", controller.create);

router.post(
  "/create",
  upload.single("thumbnail"),
  uploadCloud.upload,
  validate.createPost,
  controller.createPost
);
router.get("/edit/:id", controller.edit);
router.patch(
  "/edit/:id",
  upload.single("thumbnail"),
  uploadCloud.upload,
  validate.createPost,
  controller.editPatch
);
module.exports = router;
