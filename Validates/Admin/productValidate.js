module.exports.createPost = (req, res, next) => {
  const checkValidate = Object.entries(req.body).some(
    ([key, value]) => key != "position" && value === ""
  );
  if (checkValidate) {
    req.flash("error", `Bạn cần nhập đầy đủ thông tin để sản phẩm được tạo`);
    res.redirect("back");
    return;
  }
  next();
};
