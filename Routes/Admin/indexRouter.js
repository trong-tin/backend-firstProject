const dasboardtRoute = require("./dasboardRouter");
const productRoute = require("./productRouter");
const productCategoryRoute = require("./productCategoryRouter");
const rolesRouter = require("./rolesRouter");
const accountsRouter = require("./accountsRouter");
const authRouter = require("./authRouter");
const authMiddleware = require("../../middlewares/Admin/authMiddlewares");
const systemConfig = require("../../config/system");

module.exports = (app) => {
  const PATH_ADMIN = systemConfig.prefixAdmin;
  app.use(
    PATH_ADMIN + "/dashboard",
    authMiddleware.requireAuth,
    dasboardtRoute
  );
  app.use(PATH_ADMIN + "/product", authMiddleware.requireAuth, productRoute);
  app.use(
    PATH_ADMIN + "/product-category",
    authMiddleware.requireAuth,
    productCategoryRoute
  );
  app.use(PATH_ADMIN + "/roles", authMiddleware.requireAuth, rolesRouter);
  app.use(PATH_ADMIN + "/accounts", authMiddleware.requireAuth, accountsRouter);
  app.use(PATH_ADMIN + "/auth", authRouter);
};
