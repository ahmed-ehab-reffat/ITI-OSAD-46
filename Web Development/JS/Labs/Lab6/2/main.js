import Rectangle from "./rectangle.js";
import Square from "./square.js";
import Circle from "./circle.js";

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
