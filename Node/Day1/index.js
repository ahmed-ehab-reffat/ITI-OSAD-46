const fs = require("fs");
const path = require("path");

const inventoryPath = path.join(__dirname, "inventory.json");
let inventory = JSON.parse(fs.readFileSync(inventoryPath, "utf-8"));

const [, , command] = process.argv;

if (command === "add") {
  add();
} else if (command === "destock") {
  destock();
} else if (command === "restock") {
  restock();
} else if (command === "edit") {
  edit();
} else if (command === "remove") {
  remove();
} else if (command === "list") {
  list();
} else if (command === "summary") {
  summary();
}

function save(inventory) {
  fs.writeFileSync(inventoryPath, JSON.stringify(inventory));
}

function isValidNumber(value) {
  return value && !isNaN(value) && value > 0;
}

function isValidString(value) {
  return value && value.trim().length > 0;
}

function generateId() {
  const length = inventory.length;
  if (length === 0) {
    return 1;
  }

  const lastId = inventory[length - 1].id;
  return lastId + 1;
}

function getItem(id) {
  return inventory.find((item) => item.id === id);
}

function getStatus(item) {
  let status = "out of stock";

  if (item.quantity > 2) {
    status = "available";
  } else if (item.quantity > 0) {
    status = "low stock";
  }

  return status;
}

function add() {
  const [, , , value] = process.argv;

  if (!isValidString(value)) {
    console.log("Not a valid name.");
    return;
  }

  const id = generateId();
  const item = {
    id,
    value,
    quantity: 1,
    category: "General",
  };

  inventory.push(item);

  save(inventory);
}

function destock() {
  let [, , , id, amount] = process.argv;
  id = Number(id);
  amount = Number(amount);

  if (!isValidNumber(id) || !isValidNumber(amount)) {
    console.log("Not a valid number");
    return;
  }

  const item = getItem(id);

  if (!item) {
    console.log("Item not found");
    return;
  }

  if (item.quantity < amount) {
    console.log("Stock is less than the amount you are trying to destock");
    return;
  }

  item.quantity -= amount;

  save(inventory);
}

function restock() {
  let [, , , id, amount] = process.argv;
  id = Number(id);
  amount = Number(amount);

  if (!isValidNumber(id) || !isValidNumber(amount)) {
    console.log("Not a valid number");
    return;
  }

  const item = getItem(id);

  if (!item) {
    console.log("Item not found");
    return;
  }

  item.quantity += amount;

  save(inventory);
}

function edit() {
  let [, , , id, value] = process.argv;
  id = Number(id);

  if (!isValidNumber(id)) {
    console.log("Not a valid number");
    return;
  }

  if (!isValidString(value)) {
    console.log("Not a valid name.");
    return;
  }

  const item = getItem(id);

  if (!item) {
    console.log("Item not found");
    return;
  }

  item.value = value;

  save(inventory);
}

function remove() {
  let [, , , id] = process.argv;
  id = Number(id);

  if (!isValidNumber(id)) {
    console.log("Not a valid number");
    return;
  }

  inventory = inventory.filter((item) => item.id !== id);

  save(inventory);
}

function list() {
  inventory.map((item) => {
    let status = getStatus(item);

    console.log("ID:", item.id);
    console.log("Value:", item.value);
    console.log("Quantity:", item.quantity);
    console.log("Category:", item.category);
    console.log("Status:", status);
    console.log("=".repeat(20));
  });
}

function summary() {
  let quantity = 0;
  let available = 0;
  let lowStock = 0;
  let outOfStock = 0;

  inventory.map((item) => {
    quantity += item.quantity;

    if (getStatus(item) === "available") {
      available += 1;
    } else if (getStatus(item) === "low stock") {
      lowStock += 1;
    } else {
      outOfStock += 1;
    }
  });

  console.log("Number of items", inventory.length);
  console.log("Quantity of all items", quantity);
  console.log("Available Items", available);
  console.log("Low stock Items", lowStock);
  console.log("Out of stock Items", outOfStock);
}
