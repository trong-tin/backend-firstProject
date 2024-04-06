const productRoute = require("./productRoute");
const homeRoute = require("./homeRoute");
module.exports = (app) => {
  app.use("/product", productRoute);
  app.use("/", homeRoute);
};
