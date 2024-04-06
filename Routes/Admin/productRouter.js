const express = require("express");
const controller = require("../../Controllers/Admin/productController");
const storageMulte = require("../../helpers/storageMulter");
const validate = require("../../Validates/Admin/productValidate");
const router = express.Router();
const multer = require("multer");
const upload = multer({ storage: storageMulte() });
router.get("/", controller.index);
router.patch("/change-status/:status/:id", controller.changeStatus);
router.patch("/change-multi", controller.changeMulti);
router.delete("/deleted/:id", controller.deleteItem);
router.get("/create", controller.create);
router.post(
  "/create",
  upload.single("thumbnail"),
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
