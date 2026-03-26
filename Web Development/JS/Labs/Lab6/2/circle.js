import Shape from "./shape.js";

export default class Circle extends Shape {
  static count = 0;

  constructor(radius) {
    super();
    this.radius = radius;
    Circle.count++;
  }

  static getCount() {
    return Circle.count;
  }

  area() {
    return this.radius * this.radius * Math.PI;
  }

  perimeter() {
    return 2 * this.radius * Math.PI;
  }
}
