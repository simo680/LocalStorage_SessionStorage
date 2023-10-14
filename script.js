let data = {};
let storageType = localStorage;

function selectStorage() {
  let selectElement = document.getElementById("storageSelect");
  if (selectElement.value === "localStorage") {
    storageType = localStorage;
  } else if (selectElement.value === "sessionStorage") {
    storageType = sessionStorage;
  }
}

function updateTable() {
  let tableBody = document.querySelector("tbody");
  tableBody.innerHTML = "";

  let data = JSON.parse(storageType.getItem("data"));

  if (!data || Object.keys(data).length === 0) {
    let row = tableBody.insertRow();
    let cell = row.insertCell();
    cell.colSpan = 4;
    cell.textContent = "emptyHeader";
  } else {
    Object.keys(data).forEach((key, index) => {
      let row = tableBody.insertRow();
      let cell1 = row.insertCell(0);
      let cell2 = row.insertCell(1);
      let cell3 = row.insertCell(2);
      let cell4 = row.insertCell(3);
      cell1.textContent = index + 1;
      cell2.textContent = key;
      cell3.textContent = data[key];

      let deleteButton = document.createElement("span");
      deleteButton.textContent = "X";
      deleteButton.onclick = function () {
        deleteItem(key);
      };
      cell4.appendChild(deleteButton);
    });
  }
}

function getStorage() {
  let currentStorage = storageType;
  updateTable();
}

function saveItem() {
  let key = document.getElementById("keyInput").value;
  let value = document.getElementById("valueInput").value;
  data[key] = value;
  storageType.setItem("data", JSON.stringify(data));
  updateTable();
}

function deleteItem(key) {
  let confirmation = confirm("Вы уверены, что хотите удалить эту запись?");
  if (confirmation) {
    delete data[key];
    storageType.setItem("data", JSON.stringify(data));
    updateTable();
  }
}

function clearStorage() {
  let confirmation = confirm(
    "Вы уверены, что хотите полностью очистить хранилище?"
  );
  if (confirmation) {
    storageType.clear();
    updateTable();
  }
}
