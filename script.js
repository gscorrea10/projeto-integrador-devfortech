var selectedRow = null;

function onFormSubmit() {
  if (validate()) {
    var formValues = readForm();
    if (selectedRow == null) insertClient(formValues);
    else updateClient(formValues);
    clearForm();
  }
}

function readForm() {
  var formValues = {};
  formValues["name"] = document.getElementById("name").value;
  formValues["cpf"] = document.getElementById("cpf").value;
  formValues["email"] = document.getElementById("email").value;
  formValues["uf"] = document.getElementById("uf").value;
  return formValues;
}

function insertClient(data) {
  var table = document.getElementById("lista").getElementsByTagName("tbody")[0];
  var newRow = table.insertRow(table.length);
  cell1 = newRow.insertCell(0);
  cell1.innerHTML = data.name;
  cell2 = newRow.insertCell(1);
  cell2.innerHTML = data.cpf;
  cell3 = newRow.insertCell(2);
  cell3.innerHTML = data.email;
  cell4 = newRow.insertCell(3);
  cell4.innerHTML = data.uf;
  cell4 = newRow.insertCell(4);
  cell4.innerHTML = `<button onClick="editClient(this)">Edit</button>
                       <button onClick="deleteClient(this)">Delete</button>`;
}

function clearForm() {
  document.getElementById("name").value = "";
  document.getElementById("cpf").value = "";
  document.getElementById("email").value = "";
  document.getElementById("uf").value = "";
  selectedRow = null;
}

function editClient(td) {
  selectedRow = td.parentElement.parentElement;
  document.getElementById("name").value = selectedRow.cells[0].innerHTML;
  document.getElementById("cpf").value = selectedRow.cells[1].innerHTML;
  document.getElementById("email").value = selectedRow.cells[2].innerHTML;
  document.getElementById("uf").value = selectedRow.cells[3].innerHTML;
}
function updateClient(formValues) {
  selectedRow.cells[0].innerHTML = formValues.name;
  selectedRow.cells[1].innerHTML = formValues.cpf;
  selectedRow.cells[2].innerHTML = formValues.email;
  selectedRow.cells[3].innerHTML = formValues.uf;
}

function deleteClient(td) {
  if (confirm("Você tem certeza que deseja deletar esse cliente??")) {
    row = td.parentElement.parentElement;
    document.getElementById("lista").deleteRow(row.rowIndex);
    clearForm();
  }
}
function validate() {
  isValid = true;
  if (document.getElementById("name").value == "") {
    isValid = false;
    document.getElementById("nameValidationError").classList.remove("hide");
  } else {
    isValid = true;
    if (
      !document.getElementById("nameValidationError").classList.contains("hide")
    )
      document.getElementById("nameValidationError").classList.add("hide");
  }
  return isValid;
}
