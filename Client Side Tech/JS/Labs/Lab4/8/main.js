const form = document.getElementsByTagName("form")[0];
const tableBody = document.getElementsByTagName("tbody")[0];

const nameInput = document.getElementById("name");
const ageInput = document.getElementById("age");
const emailInput = document.getElementById("email");

const nameErrorSpan = document.getElementById("nameError");
const ageErrorSpan = document.getElementById("ageError");
const emailErrorSpan = document.getElementById("emailError");

function submitForm() {
  if (isValidForm()) {
    addRowToTable();
    resetForm();
  }
}

function isValidForm() {
  let isValid = true;

  clearErrors();

  const nameVal = nameInput.value.trim();
  const ageVal = ageInput.value.trim();
  const emailVal = emailInput.value.trim();

  if (nameVal === "") {
    nameErrorSpan.textContent = "Name is required.";
    isValid = false;
  } else if (!isValidName(nameVal)) {
    nameErrorSpan.textContent = "Name can only contain letters and spaces.";
    isValid = false;
  }

  if (ageVal === "") {
    ageErrorSpan.textContent = "Age is required.";
    isValid = false;
  } else if (Number(ageVal) <= 0) {
    ageErrorSpan.textContent = "Age must be a positive number.";
    isValid = false;
  }

  if (emailVal === "") {
    emailErrorSpan.textContent = "Email is required.";
    isValid = false;
  } else if (!isValidEmailFormat(emailVal)) {
    emailErrorSpan.textContent = "Please enter a valid email format.";
    isValid = false;
  }

  return isValid;
}

function addRowToTable() {
  const row = document.createElement("tr");

  const nameCell = document.createElement("td");
  nameCell.textContent = nameInput.value;

  const ageCell = document.createElement("td");
  ageCell.textContent = ageInput.value;

  const emailCell = document.createElement("td");
  emailCell.textContent = emailInput.value;

  row.appendChild(nameCell);
  row.appendChild(ageCell);
  row.appendChild(emailCell);

  tableBody.appendChild(row);
}

function resetForm() {
  form.reset();
  clearErrors();
}

function clearErrors() {
  nameErrorSpan.textContent = "";
  ageErrorSpan.textContent = "";
  emailErrorSpan.textContent = "";
}

function isValidEmailFormat(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}

function isValidName(name) {
  const re = /^[a-zA-Z\s]+$/;
  return re.test(name);
}
