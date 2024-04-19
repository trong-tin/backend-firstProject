// [GET] admin/dasboard
module.exports.dashboard = (req, res) => {
  res.render("Admin/pages/dashboard/index", {
    pageTitle: "Trang Tổng quan",
  });
};
