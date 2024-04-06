const dasboardtRoute = require("./dasboardRouter");
const productRoute = require("./productRouter");
const systemConfig = require("../../config/system");
module.exports = (app) => {
  const PATH_ADMIN = systemConfig.prefixAdmin;
  app.use(PATH_ADMIN + "/dasboard", dasboardtRoute);
  app.use(PATH_ADMIN + "/product", productRoute);
};
