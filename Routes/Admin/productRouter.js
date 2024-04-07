const express = require("express");
const multer = require("multer");

const router = express.Router();

//Cloudinary

//END Cloudinary

const upload = multer();
const controller = require("../../Controllers/Admin/productController");
const validate = require("../../Validates/Admin/productValidate");
const uploadCloud = require("../../middlewares/Admin/uploadCloudMiddleware");

router.get("/", controller.index);

router.patch("/change-status/:status/:id", controller.changeStatus);
router.patch("/change-multi", controller.changeMulti);
router.delete("/deleted/:id", controller.deleteItem);
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
  validate.createPost,
  controller.editPatch
);
router.get("/detail/:id", controller.detail);
module.exports = router;
