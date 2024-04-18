// [GET] /admin/product
const Product = require("../../models/productModel");
const ProductCategory = require("../../models/productCategoryModel");
const systemConfig = require("../../config/system");
const filterStatusHelper = require("../../helpers/filterStatus");
const searchHelper = require("../../helpers/search");
const paginationHelper = require("../../helpers/pagination");
const createTreeHelper = require("../../helpers/createTree");
module.exports.index = async (req, res) => {
  const filterStatus = filterStatusHelper(req.query);
  let find = {
    deleted: false,
  };

  if (req.query.status) {
    find.status = req.query.status;
  }

  const search = searchHelper(req.query);
  if (search.regex) {
    find.title = search.regex;
  }

  //Pagination
  const countProducts = await Product.countDocuments(find);
  let objectPagination = paginationHelper(
    {
      limitItems: 4,
      currentPage: 1,
    },
    req.query,
    countProducts
  );
  // Sort
  let sort = {};
  if (req.query.sortKey && req.query.sortValue) {
    sort[req.query.sortKey] = req.query.sortValue;
  } else {
    sort.position = "desc";
  }

  // END Sort
  const products = await Product.find(find)
    .sort(sort)
    .limit(objectPagination.limitItems)
    .skip(objectPagination.skip);
  res.render("Admin/pages/product/index", {
    pageTitle: "Danh sách sản phẩm",
    products: products,
    filterStatus: filterStatus,
    keyword: search.keyword,
    pagination: objectPagination,
  });
};

// [PATCH] /admin/product/change-status/:status/:id
module.exports.changeStatus = async (req, res) => {
  const status = req.params.status;
  const id = req.params.id;
  await Product.updateOne({ _id: id }, { status: status });
  req.flash("success", "Đã cập nhật trạng thái sản phẩm thành công");
  res.redirect("back");
};

// [PATCH] /admin/product/change-multi
module.exports.changeMulti = async (req, res) => {
  const type = req.body.type;
  const ids = req.body.ids.split(", ");
  switch (type) {
    case "active":
      await Product.updateMany({ _id: { $in: ids } }, { status: type });
      req.flash(
        "success",
        `Đã cập nhật trạng thái hoạt động cho ${ids.length} sản phẩm này`
      );
      break;
    case "inactive":
      await Product.updateMany({ _id: { $in: ids } }, { status: type });
      req.flash(
        "success",
        `Đã cập nhật trạng thái dừng hoạt động cho ${ids.length} sản phẩm này`
      );
      break;
    case "delete-all":
      await Product.updateMany(
        { _id: { $in: ids } },
        { deleted: true, deletedAt: new Date() }
      );
      req.flash("success", `Đã xóa ${ids.length} sản phẩm thành công`);
      break;
    case "change-positon":
      for (const item of ids) {
        let [id, position] = item.split("-");
        position = parseInt(position);
        await Product.updateOne({ _id: id }, { position: position });
      }
      req.flash(
        "success",
        `Đã thay đổi vị trí ${ids.length} sản phẩm thành công`
      );
      break;
    default:
      break;
  }
  res.redirect("back");
};

// [PATCH] /admin/product/delete/:id
module.exports.deleteItem = async (req, res) => {
  const id = req.params.id;
  await Product.updateOne(
    { _id: id },
    { deleted: true },
    { deleteAt: new Date() }
  );
  res.redirect("back");
  req.flash("success", `Đã xóa sản phẩm này thành công`);
};

// [GET] /admin/product/create
module.exports.create = async (req, res) => {
  const category = await ProductCategory.find({ deleted: false });
  const newCategory = createTreeHelper.tree(category);
  res.render("Admin/pages/product/create", {
    pageTitle: "Thêm mới sản phẩm",
    category: newCategory,
  });
};

// [POST] /admin/product/create
module.exports.createPost = async (req, res) => {
  req.body.price = parseInt(req.body.price);
  req.body.stock = parseInt(req.body.stock);
  req.body.discountPercentage = parseInt(req.body.discountPercentage);
  if (req.body.position == "") {
    const countProducts = await Product.countDocuments({ deleted: false });
    req.body.position = countProducts + 1;
  } else {
    req.body.position = parseInt(req.body.position);
  }
  const product = new Product(req.body);
  await product.save();
  res.redirect(`${systemConfig.prefixAdmin}/product`);
};
// [GET] /admin/product/edit/:id
module.exports.edit = async (req, res) => {
  try {
    const id = req.params.id;
    const product = await Product.findOne({
      deleted: false,
      _id: id,
    });
    const category = await ProductCategory.find({ deleted: false });
    const newCategory = createTreeHelper.tree(category);
    res.render("Admin/pages/product/edit", {
      pageTitle: "Chỉnh sửa sản phẩm",
      product: product,
      category: newCategory,
    });
  } catch {
    res.redirect(`${systemConfig.prefixAdmin}/product`);
  }
};
// [PATCH] /admin/product/edit/:id
module.exports.editPatch = async (req, res) => {
  const id = req.params.id;
  req.body.price = parseInt(req.body.price);
  req.body.stock = parseInt(req.body.stock);
  req.body.discountPercentage = parseInt(req.body.discountPercentage);
  req.body.position = parseInt(req.body.position);
  if (req.file) {
    req.body.thumbnail = `/Uploads/${req.file.filename}`;
  }
  try {
    await Product.updateOne({ _id: id }, req.body);
  } catch (error) {}
  res.redirect(`${systemConfig.prefixAdmin}/product`);
};
module.exports.detail = async (req, res) => {
  const id = req.params.id;
  const product = await Product.findOne({ deleted: false, _id: id });
  console.log(product);
  res.render("Admin/pages/product/detail", {
    product: product,
    pageTitle: `Chi tiết về sản phẩm:${product.title}`,
  });
};
