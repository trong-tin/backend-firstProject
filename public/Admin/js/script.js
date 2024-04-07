//Button Status
const buttonStatus = document.querySelectorAll("[button-status]");
if (buttonStatus.length > 0) {
  let url = new URL(window.location.href);
  buttonStatus.forEach((button) => {
    button.addEventListener("click", () => {
      button.classList.add("active");
      const status = button.getAttribute("button-status");
      if (status) {
        url.searchParams.set("status", status);
      } else {
        url.searchParams.delete("status");
      }
      window.location.href = url.href;
    });
  });
}
//END Button Status

// Form Search
const formSearch = document.querySelector("#form-search");
if (formSearch) {
  let url = new URL(window.location.href);
  formSearch.addEventListener("submit", (e) => {
    e.preventDefault();
    const keyword = e.target.elements.keyword.value;
    if (keyword) {
      url.searchParams.set("keyword", keyword);
    } else {
      url.searchParams.delete("keyword");
    }
    window.location.href = url.href;
  });
}
// END Form Search

//Pagination
const buttonPagination = document.querySelectorAll("[button-pagination]");
if (buttonPagination.length > 0) {
  let url = new URL(window.location.href);
  buttonPagination.forEach((button) => {
    button.addEventListener("click", () => {
      const pageNumber = button.getAttribute("button-pagination");
      if (pageNumber) {
        url.searchParams.set("page", pageNumber);
      } else {
        url.searchParams.delete("page");
      }
      window.location.href = url.href;
    });
  });
}
//END Pagination

//Checkbox Multi
const checkboxMulti = document.querySelector("[checkbox-multi]");
if (checkboxMulti) {
  const inputCheckAll = checkboxMulti.querySelector("input[name='checkall']");
  const inputId = checkboxMulti.querySelectorAll("input[name='id']");
  inputCheckAll.addEventListener("click", () => {
    if (inputCheckAll.checked) {
      inputId.forEach((input) => {
        input.checked = true;
      });
    } else {
      inputId.forEach((input) => {
        input.checked = false;
      });
    }
  });
  inputId.forEach((input) => {
    input.addEventListener("click", () => {
      const countChecked = checkboxMulti.querySelectorAll(
        "input[name='id']:checked"
      ).length;
      if (countChecked == inputId.length) {
        inputCheckAll.checked = true;
      } else {
        inputCheckAll.checked = false;
      }
    });
  });
}
//END Checkbox Multi

// Form Change Multi
const formChangeMulti = document.querySelector("[form-change-multi]");
if (formChangeMulti) {
  formChangeMulti.addEventListener("submit", (e) => {
    e.preventDefault();
    const checkboxMulti = document.querySelector("[checkbox-multi]");
    const inputChecked = checkboxMulti.querySelectorAll(
      "input[name='id']:checked"
    );

    const typeChange = e.target.elements.type.value;
    if (typeChange == "delete-all") {
      const isConfirm = confirm("Bạn có chắc muốn xóa không");
      if (!isConfirm) {
        return;
      }
    }

    if (inputChecked.length > 0) {
      let ids = [];
      inputChecked.forEach((input) => {
        const id = input.value;
        if (typeChange == "change-positon") {
          const position = input
            .closest("tr")
            .querySelector("input[name='position']").value;
          ids.push(`${id}-${position}`);
        } else {
          ids.push(id);
        }
      });
      const inputValue = formChangeMulti.querySelector("input[name='ids']");
      inputValue.value = ids.join(", ");
      formChangeMulti.submit();
    } else {
      alert("Vui lòng chọn ít nhất một bản ghi");
    }
  });
}
// END Form Change Multi

// Delete
const buttonDelete = document.querySelectorAll("[button-delete]");
if (buttonDelete) {
  const formDeleteItem = document.getElementById("form-delete-item");
  if (formDeleteItem) {
    const path = formDeleteItem.getAttribute("data-path");
    buttonDelete.forEach((button) => {
      button.addEventListener("click", () => {
        const isConfirm = confirm("Bạn có chắc muốn xóa sản phẩm này");
        if (isConfirm) {
          const id = button.getAttribute("data-id");
          const action = `${path}/${id}?_method=DELETE`;
          formDeleteItem.action = action;
          formDeleteItem.submit();
        }
      });
    });
  }
}
// END Delete

// Show Alert
const showAlert = document.querySelector("[show-alert]");
if (showAlert) {
  const time = parseInt(showAlert.getAttribute("data-time"));
  setTimeout(() => {
    showAlert.classList.add("alert-hidden");
  }, time);
  const closeAlert = showAlert.querySelector("[close-alert]");
  closeAlert.addEventListener("click", () => {
    showAlert.classList.add("alert-hidden");
  });
}
// END Show Alert

// Upload Image
const uploadImage = document.querySelector("[upload-image]");
const button = document.createElement("button");
button.setAttribute("class", "btn btn-primary ms-2");
button.setAttribute("id", "button-deleted-preview");
button.setAttribute("type", "button");
button.textContent = "Lấy ảnh khác";
if (uploadImage) {
  const uploadImageInput = uploadImage.querySelector("[upload-image-input]");
  const uploadImagePreview = uploadImage.querySelector(
    "[upload-image-preview]"
  );
  uploadImageInput.addEventListener("change", (e) => {
    const file = e.target.files[0];
    if (file) {
      uploadImagePreview.src = URL.createObjectURL(file);
      uploadImage.appendChild(button);
      checkButtonExists();
    }
  });
}
// END Upload Image

// Delete Image Preview
const checkButtonExists = () => {
  const buttonDeleteImagePreview = document.getElementById(
    "button-deleted-preview"
  );
  if (buttonDeleteImagePreview) {
    buttonDeleteImagePreview.addEventListener("click", () => {
      document.querySelector("[upload-image-input]").value = "";
      document.querySelector("[upload-image-preview]").src = "";
      buttonDeleteImagePreview.remove();
    });
  }
};
// END Delete Image Preview
// Sort
const sort = document.querySelector("[sort]");
if (sort) {
  let url = new URL(window.location.href);
  const sortSelect = sort.querySelector("[sort-select]");
  const sortClear = sort.querySelector("[sort-clear]");
  sortSelect.addEventListener("change", (e) => {
    const value = e.target.value;
    const [sortKey, sortValue] = value.split("-");

    url.searchParams.set("sortKey", sortKey);
    url.searchParams.set("sortValue", sortValue);

    window.location.href = url.href;
  });
  sortClear.addEventListener("click", () => {
    window.location.href = url.pathname;
  });
  const sortKey = url.searchParams.get("sortKey");
  const sortValue = url.searchParams.get("sortValue");
  if (sortKey && sortValue) {
    const stringSort = `${sortKey}-${sortValue}`;
    const optionSelect = sortSelect.querySelector(
      `option[value=${stringSort}]`
    );
    optionSelect.setAttribute("selected", true);
  }
}
// END Sort
