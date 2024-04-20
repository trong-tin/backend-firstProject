const systemConfig = require("../../config/system");
const md5 = require("md5");
const Account = require("../../models/accountModel");

// [GET] /admin/auth/login
module.exports.login = async (req, res) => {
  const token = req.cookies.token;
  if (token) {
    const user = await Account.find({
      deleted: false,
      token: token,
    });
    if (user) {
      res.redirect(`${systemConfig.prefixAdmin}/dashboard`);
    } else {
      res.redirect(`${systemConfig.prefixAdmin}/auth/login`);
    }
  } else {
    res.render("Admin/pages/auth/login", {
      pageTitle: "Đăng nhập",
    });
  }
};

// [POST] /admin/auth/login
module.exports.loginPost = async (req, res) => {
  const email = req.body.email;
  const password = md5(req.body.password);
  const user = await Account.findOne({
    deleted: false,
    email: email,
  });
  if (!user) {
    req.flash("error", "Email không tồn tại");
    res.redirect("back");
    return;
  }
  if (password != user.password) {
    req.flash("error", "Sai mật khẩu");
    res.redirect("back");
    return;
  }
  if (user.status == "inactive") {
    req.flash("error", "Tài khoản ngừng hoạt động");
    res.redirect("back");
    return;
  }
  res.cookie("token", user.token);
  res.redirect(`${systemConfig.prefixAdmin}/dashboard`);
};

// [GET] /admin/auth/logout
module.exports.logout = async (req, res) => {
  res.clearCookie("token");
  res.redirect(`${systemConfig.prefixAdmin}/auth/login`);
};
