const systemConfig = require("../../config/system");
const Account = require("../../models/accountModel");
const Role = require("../../models/roleModel");
module.exports.requireAuth = async (req, res, next) => {
  const token = req.cookies.token;
  if (token) {
    const user = await Account.findOne({
      deleted: false,
      token: token,
    }).select("-password");
    if (user) {
      const role = await Role.findOne({
        deleted: false,
        _id: user.role_id,
      }).select("title permissions");
      res.locals.user = user;
      res.locals.role = role;
      next();
    } else {
      res.redirect(`${systemConfig.prefixAdmin}/auth/login`);
    }
  } else {
    res.redirect(`${systemConfig.prefixAdmin}/auth/login`);
  }
};
