// [GET] admin/dasboard
module.exports.dasboard = (req, res) => {
  res.render("Admin/pages/dasboard/index", {
    pageTitle: "Trang Tổng quan",
  });
};
