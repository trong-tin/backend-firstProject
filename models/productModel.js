const mongoose = require("mongoose");
const slug = require("mongoose-slug-updater");
mongoose.plugin(slug);
const productSchema = new mongoose.Schema(
  {
    title: String,
    description: String,
    product_category_id: {
      type: String,
      default: "",
    },
    price: Number,
    discountPercentage: Number,
    rating: Number,
    stock: Number,
    brand: String,
    category: String,
    thumbnail: String,
    images: [String],
    status: String,
    position: Number,
    slug: { type: String, slug: "title", unique: true },
    createdBy: {
      account_id: String,
      createdAt: {
        type: Date,
        default: new Date(new Date().getTime()),
      },
    },
    deletedBy: {
      account_id: String,
      deletedAt: Date,
    },
    deleted: {
      type: Boolean,
      default: false,
    },
    deletedAt: Date,
  },
  { timestamps: true }
);

const Product = mongoose.model("product", productSchema, "product");

module.exports = Product;
