const systemConfig = require("../../config/system");
const md5 = require("md5");
const Acccount = require("../../models/accountModel");

// [GET] /admin/auth/login
module.exports.login = async (req, res) => {
  res.render("Admin/pages/auth/login", {
    pageTitle: "Đăng nhập",
  });
};

// [POST] /admin/auth/login
module.exports.loginPost = async (req, res) => {
  const email = req.body.email;
  const password = md5(req.body.password);
  const user = await Acccount.findOne({
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
