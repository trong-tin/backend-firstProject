const dasboardtRoute = require("./dasboardRouter");
const productRoute = require("./productRouter");
const productCategoryRoute = require("./productCategoryRouter");
const rolesRouter = require("./rolesRouter");
const accountsRouter = require("./accountsRouter");
const systemConfig = require("../../config/system");

module.exports = (app) => {
  const PATH_ADMIN = systemConfig.prefixAdmin;
  app.use(PATH_ADMIN + "/dasboard", dasboardtRoute);
  app.use(PATH_ADMIN + "/product", productRoute);
  app.use(PATH_ADMIN + "/product-category", productCategoryRoute);
  app.use(PATH_ADMIN + "/roles", rolesRouter);
  app.use(PATH_ADMIN + "/accounts", accountsRouter);
};
