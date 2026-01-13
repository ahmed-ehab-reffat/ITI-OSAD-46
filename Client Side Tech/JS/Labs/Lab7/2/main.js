class Shape {
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

class Rectangle extends Shape {
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

class Square extends Shape {
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

class Circle extends Shape {
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

const myRect = new Rectangle(10, 5);
const mySquare = new Square(4);
const myCircle = new Circle(7);
const anotherCircle = new Circle(10);

console.log(myRect.toString());
console.log(mySquare.toString());
console.log(myCircle.toString());

console.log(Rectangle.getCount());
console.log(Square.getCount());
console.log(Circle.getCount());

try {
  const failRect = new Rectangle(2, 2);
} catch (e) {
  console.error(e.message);
}
