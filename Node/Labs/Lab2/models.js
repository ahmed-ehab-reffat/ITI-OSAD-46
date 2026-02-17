const path = require("path");
const fs = require("fs");

const inventoryPath = path.join(__dirname, "../inventory.json");

let inventory = JSON.parse(fs.readFileSync(inventoryPath, "utf-8"));

function save() {
  fs.writeFileSync(inventoryPath, JSON.stringify(inventory));
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

function addItem(name) {
  if (!isValidString(name)) {
    console.log("Error: Invalid item name");
    return false;
  }

  const item = {
    id: generateId(),
    name: name.trim(),
    quantity: 1,
    category: "General",
  };

  inventory.push(item);
  save();
  return true;
}

function getInventory() {
  return inventory;
}

function getItem(id) {
  id = Number(id);
  return inventory.find((item) => item.id === id);
}

module.exports = {
  addItem,
  getInventory,
  getItem,
};
