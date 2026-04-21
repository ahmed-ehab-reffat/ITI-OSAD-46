const path = require("path");
const fs = require("fs");

const inventoryPath = path.join(__dirname, "../inventory.json");

let inventory = JSON.parse(fs.readFileSync(inventoryPath, "utf-8"));

function getInventory() {
  return inventory;
}

function save() {
  fs.writeFileSync(inventoryPath, JSON.stringify(inventory));
}

function generateId() {
  if (inventory.length === 0) {
    return 1;
  }

  const lastId = inventory.at(-1).id;
  return lastId + 1;
}

function addItem(name, quantity, category) {
  const item = {
    id: generateId(),
    name: name.trim(),
    quantity,
    category: category.trim(),
  };

  inventory.push(item);
  save();
  return item;
}

function destockItem(id, amount) {
  const item = getItem(id);

  if (!item) {
    return false;
  }

  if (item.quantity < amount) {
    console.warn("Stock is less than the amount you are trying to destock");
    return false;
  }

  item.quantity -= amount;

  save();
  return true;
}

function restockItem(id, amount) {
  const item = getItem(id);

  if (!item) {
    return false;
  }

  item.quantity += amount;

  save();
  return true;
}

function getItem(id) {
  return inventory.find((item) => item.id === id);
}

function removeItem(id) {
  const index = inventory.findIndex((item) => item.id === id);

  if (index === -1) {
    return false;
  }

  const deletedItem = inventory.splice(index, 1)[0];

  save();
  return deletedItem;
}

module.exports = {
  addItem,
  removeItem,
  getInventory,
  getItem,
  destockItem,
  restockItem,
};
