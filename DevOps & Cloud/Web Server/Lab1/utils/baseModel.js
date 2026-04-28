const fs = require('node:fs');
const path = require('node:path');

class BaseModel {
  constructor(filename) {
    this.filePath = path.join(__dirname, '..', `${filename}.json`);
    this.data = this.loadData();
    this.nextId = this.calculateNextId();
  }

  loadData() {
    try {
      if (fs.existsSync(this.filePath)) {
        return JSON.parse(fs.readFileSync(this.filePath, 'utf-8'));
      } else {
        fs.writeFileSync(this.filePath, JSON.stringify([], null, 2));
        return [];
      }
    } catch (error) {
      console.error(`Error loading ${this.filePath}:`, error);
      return [];
    }
  }

  saveData() {
    try {
      fs.writeFileSync(this.filePath, JSON.stringify(this.data, null, 2));
    } catch (error) {
      console.error(`Error saving ${this.filePath}:`, error);
    }
  }

  calculateNextId() {
    if (this.data.length === 0) {
      return 1;
    }
    return Math.max(...this.data.map((item) => item.id)) + 1;
  }

  getAll() {
    return [...this.data];
  }

  getById(id) {
    return this.data.find((item) => item.id === id) || null;
  }

  create(itemData) {
    const item = {
      id: this.nextId++,
      ...itemData
    };

    this.data.push(item);
    this.saveData();
    return item;
  }

  update(id, itemData) {
    const index = this.data.findIndex((item) => item.id === id);

    if (index === -1) {
      return null;
    }

    this.data[index] = {
      id,
      ...itemData
    };

    this.saveData();
    return this.data[index];
  }

  remove(id) {
    const index = this.data.findIndex((item) => item.id === id);

    if (index === -1) {
      return null;
    }

    const deletedItem = this.data.splice(index, 1)[0];
    this.saveData();
    return deletedItem;
  }
}

module.exports = BaseModel;
