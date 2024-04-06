// Detail
const products = document.querySelectorAll(".product-items");
if (products) {
  products.forEach((item) => {
    item.addEventListener("click", () => {
      let url = new URL(window.location.href);
      const slug = item.getAttribute("slug");
      url = `${url.href}/detail/${slug}`;
      window.location.href = url;
    });
  });
}
// END Detail
