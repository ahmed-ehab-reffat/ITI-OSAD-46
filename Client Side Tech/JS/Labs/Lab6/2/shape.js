export default class Shape {
  constructor() {
    if (this.constructor === Shape) {
      throw new Error("Shape is not a constructor.");
    }
  }

  area() {}

  perimeter() {}

  toString() {
    return `Area = ${this.area()}, Perimeter = ${this.perimeter()}`;
  }
}
