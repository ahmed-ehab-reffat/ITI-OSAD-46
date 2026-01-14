import Shape from "./shape.js";

export default class Square extends Shape {
  static count = 0;
  static instanceCreated = false;

  constructor(side) {
    if (Square.instanceCreated) {
      throw new Error("Only one Square can be created!");
    }
    super();
    this.side = side;
    Square.count++;
    Square.instanceCreated = true;
  }

  static getCount() {
    return Square.count;
  }

  area() {
    return this.side * this.side;
  }

  perimeter() {
    return this.side * 4;
  }
}
