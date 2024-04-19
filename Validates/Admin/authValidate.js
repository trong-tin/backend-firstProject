module.exports.loginPost = (req, res, next) => {
  if (!req.body.email) {
    req.flash("error", `Vui lòng nhập Email!`);
    res.redirect("back");
    return;
  }
  if (!req.body.password) {
    req.flash("error", `Vui lòng nhập Password!`);
    res.redirect("back");
    return;
  }
  next();
};
