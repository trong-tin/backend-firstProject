const systemConfig = require("../../config/system");
const md5 = require("md5");
const Account = require("../../models/accountModel");
const Role = require("../../models/roleModel");

// [GET] /admin/accounts
module.exports.index = async (req, res) => {
  const records = await Account.find({ deleted: false }).select(
    "-password -token"
  );
  for (const item of records) {
    const nameRole = await Role.findOne({
      deleted: false,
      _id: item.role_id,
    });
    item.nameRole = nameRole.title;
  }
  res.render("Admin/pages/account/index", {
    records: records,
  });
};

// [GET] /admin/accounts/create
module.exports.create = async (req, res) => {
  const roles = await Role.find({ deleted: false });
  res.render("Admin/pages/account/create", {
    pageTitle: "Thêm mới tài khoản",
    role: roles,
  });
};

// POST] /admin/accounts/create
module.exports.createPost = async (req, res) => {
  const emailExist = await Account.findOne({
    email: req.body.email,
    deleted: false,
  });
  if (emailExist) {
    req.flash("error", `Email ${req.body.email} đã tồn tại!`);
    res.redirect("back");
  } else {
    req.body.password = md5(req.body.password);
    const record = new Account(req.body);
    await record.save();
    req.flash("success", `Tạo tài khoản thành công!`);
    res.redirect(`${systemConfig.prefixAdmin}/accounts`);
  }
};

// [GET]] /admin/accounts/edit/:id
module.exports.edit = async (req, res) => {
  const id = req.params.id;
  const record = await Account.findOne({
    deleted: false,
    _id: id,
  });
  const roles = await Role.find({
    deleted: false,
  });
  res.render("Admin/pages/account/edit", {
    pageTitle: "Chỉnh sửa tài khoản",
    record: record,
    roles: roles,
  });
};

// [PATCH]] /admin/accounts/edit/:id
module.exports.editPatch = async (req, res) => {
  if (req.body.password) {
    req.body.password = md5(req.body.password);
  } else {
    delete req.body.password;
  }
  const id = req.params.id;
  const emailExist = await Account.findOne({
    deleted: false,
    email: req.body.email,
    _id: { $ne: id },
  });
  if (emailExist) {
    req.flash("error", `Email đã được sử dụng!`);
    res.redirect("back");
  } else {
    await Account.updateOne(
      {
        _id: id,
      },
      req.body
    );
    req.flash("success", `Chỉnh sửa tài khoản thành công!`);
    res.redirect(`${systemConfig.prefixAdmin}/accounts`);
  }
};
