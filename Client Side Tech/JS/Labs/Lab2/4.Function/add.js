function add(...numbers) {
  var sum = 0;
  numbers.forEach((num) => {
    if (typeof num !== "number" || isNaN(num)) {
      throw new Error("All arguments must be valid numbers.");
    }
    sum += num;
  });
  return sum;
}

console.log(add(1, 2, 3, 4));
console.log(add(1, 2, "", 4));
