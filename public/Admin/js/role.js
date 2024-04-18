// Permissions
const tablePermissions = document.querySelector("[table-permission]");
if (tablePermissions) {
  const buttonSubmit = document.querySelector("[button-submit]");
  buttonSubmit.addEventListener("click", () => {
    let permissions = [];
    const rows = tablePermissions.querySelectorAll("[data-name]");
    rows.forEach((row) => {
      const name = row.getAttribute("data-name");
      const inputs = row.querySelectorAll("input");
      if (name == "id") {
        inputs.forEach((input) => {
          permissions.push({ id: input.value, permissions: [] });
        });
      } else {
        inputs.forEach((input, index) => {
          const checked = input.checked;
          if (checked) {
            permissions[index].permissions.push(name);
          }
        });
      }
    });
    if (permissions.length > 0) {
      const formChangePermissions = document.querySelector(
        "#form-change-permissions"
      );
      const inputPermissions = formChangePermissions.querySelector(
        "input[name='permissions']"
      );
      inputPermissions.value = JSON.stringify(permissions);
      formChangePermissions.submit();
    }
  });
}
// END Permissions

// Permissions Default
const dataRecords = document.querySelector("[data-records]");
if (dataRecords) {
  const records = JSON.parse(dataRecords.getAttribute("data-records"));
  const tablePermissions = document.querySelector("[table-permission]");
  records.forEach((record, index) => {
    record.permissions.forEach((item) => {
      const row = tablePermissions.querySelector(`[data-name='${item}']`);
      const input = row.querySelectorAll("input")[index];
      input.checked = true;
    });
  });
}
// END Permissions Default
