let arr = ["apple", "strawberry", "banana", "orange", "mango"];

let isAllString = arr.every((el) => typeof el === "string");
console.log(isAllString);

let isSomeStartWithA = arr.some((el) => el.startsWith("a"));
console.log(isSomeStartWithA);

let filtered = arr.filter((el) => el.startsWith("b") || el.startsWith("s"));
console.log(filtered);

let newArr = arr.map((el) => `I like ${el}`);
console.log(newArr);
