const dasboardtRoute = require("./dasboardRouter");
const productRoute = require("./productRouter");
const productCategoryRoute = require("./productCategoryRouter");
const rolesRouter = require("./rolesRouter");
const accountsRouter = require("./accountsRouter");
const authRouter = require("./authRouter");
const systemConfig = require("../../config/system");

module.exports = (app) => {
  const PATH_ADMIN = systemConfig.prefixAdmin;
  app.use(PATH_ADMIN + "/dashboard", dasboardtRoute);
  app.use(PATH_ADMIN + "/product", productRoute);
  app.use(PATH_ADMIN + "/product-category", productCategoryRoute);
  app.use(PATH_ADMIN + "/roles", rolesRouter);
  app.use(PATH_ADMIN + "/accounts", accountsRouter);
  app.use(PATH_ADMIN + "/auth", authRouter);
};
