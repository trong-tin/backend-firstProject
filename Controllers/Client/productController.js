const Product = require("../../models/productModel");
// [GET] /product
module.exports.index = async (req, res) => {
  const product = await Product.find({
    status: "active",
    deleted: false,
  }).sort({ position: "desc" });

  const newProduct = product.map((item) => {
    item.priceNew = (item.price * (1 - item.discountPercentage / 100)).toFixed(
      0
    );
    return item;
  });
  res.render("client/pages/Products/index", {
    pageTitle: "Danh sách sản phẩm",
    products: newProduct,
  });
};

// [GET] /product/:id
module.exports.detail = async (req, res) => {
  const slug = req.params.slug;
  const product = await Product.findOne({
    deleted: false,
    status:"active",
    slug: slug,
  });
  res.render("client/pages/Products/detail", { product: product });
};
