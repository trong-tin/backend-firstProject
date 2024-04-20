const systemConfig = require("../../config/system");
const Role = require("../../models/roleModel");

// [GET] /admin/roles
module.exports.index = async (req, res) => {
  let find = {
    deleted: false,
  };
  const records = await Role.find(find);
  res.render("Admin/pages/roles/index", {
    pageTitle: "Nhóm quyền",
    records: records,
  });
};

// [GET] /admin/roles/create
module.exports.create = async (req, res) => {
  res.render("Admin/pages/roles/create", {
    pageTitle: "Tạo nhóm quyền",
  });
};

// [POST] /admin/roles/create
module.exports.createPost = async (req, res) => {
  const record = new Role(req.body);
  await record.save();
  res.redirect(`${systemConfig.prefixAdmin}/roles`);
};

// [GET] /admin/roles/premission
module.exports.permission = async (req, res) => {
  let find = {
    deleted: false,
  };
  const records = await Role.find(find);
  res.render("Admin/pages/roles/permission", {
    pageTitle: "Phân quyền",
    records: records,
  });
};

// [PATCH] /admin/roles/premission
module.exports.permissionPatch = async (req, res) => {
  try {
    const permissions = JSON.parse(req.body.permissions);
    for (const item of permissions) {
      const id = item.id;
      const permissions = item.permissions;
      await Role.updateOne({ _id: id }, { permissions: permissions });
    }
    req.flash("success", "Cập nhật phân quyền thành công!");
    res.redirect("back");
  } catch {
    req.flash("error", "Cập nhật phân quyền thất bại!");
  }
};
