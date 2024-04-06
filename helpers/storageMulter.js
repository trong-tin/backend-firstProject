const multer = require("multer");
module.exports = () => {
  const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "./public/Uploads");
    },
    filename: (req, file, cb) => {
      const uniqueSuffix = Date.now();
      cb(null, `${uniqueSuffix}-${file.originalname}`);
    },
  });
  return storage;
};
