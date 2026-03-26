const fs = require("fs");
const path = require("path");

const inventoryPath = path.join(__dirname, "../inventory.json");
let inventory = JSON.parse(fs.readFileSync(inventoryPath, "utf-8"));

const commands = {
  add,
  destock,
  restock,
  edit,
  remove,
  list,
  summary,
  default: () => console.log("Not a valid command"),
};

const [, , command] = process.argv;

const targetCmd = commands[command] || commands.default;
targetCmd();

function save() {
  fs.writeFileSync(inventoryPath, JSON.stringify(inventory));
}

function isValidNumber(value) {
  value = Number(value);
  return value && !isNaN(value) && value > 0;
}

function isValidString(value) {
  return value && value.trim().length > 0;
}

function generateId() {
  if (inventory.length === 0) {
    return 1;
  }

  const lastId = inventory.at(-1).id;
  return lastId + 1;
}

function getItem(id) {
  id = Number(id);
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
  const [, , , name] = process.argv;

  if (!isValidString(name)) {
    console.log("Not a valid name.");
    return;
  }

  const item = {
    id: generateId(),
    name: name.trim(),
    quantity: 1,
    category: "General",
  };

  inventory.push(item);

  save();
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

  save();
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

  save();
}

function edit() {
  let [, , , id, name] = process.argv;
  id = Number(id);

  if (!isValidNumber(id)) {
    console.log("Not a valid number");
    return;
  }

  if (!isValidString(name)) {
    console.log("Not a valid name.");
    return;
  }

  const item = getItem(id);

  if (!item) {
    console.log("Item not found");
    return;
  }

  item.name = name;

  save();
}

function remove() {
  let [, , , id] = process.argv;
  id = Number(id);

  if (!isValidNumber(id)) {
    console.log("Not a valid number");
    return;
  }

  inventory = inventory.filter((item) => item.id !== id);

  save();
}

function list() {
  inventory.map((item) => {
    let status = getStatus(item);

    console.log("ID:", item.id);
    console.log("Name:", item.name);
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
