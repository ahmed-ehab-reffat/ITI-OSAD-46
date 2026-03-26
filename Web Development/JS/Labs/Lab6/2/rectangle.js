import Shape from "./shape.js";

export default class Rectangle extends Shape {
  static count = 0;
  static instanceCreated = false;

  constructor(length, width) {
    if (Rectangle.instanceCreated) {
      throw new Error("Only one Rectangle can be created!");
    }
    super();
    this.length = length;
    this.width = width;
    Rectangle.count++;
    Rectangle.instanceCreated = true;
  }

  static getCount() {
    return Rectangle.count;
  }

  area() {
    return this.length * this.width;
  }

  perimeter() {
    return (this.length + this.width) * 2;
  }
}
