function findMinMax(...numbers) {
  const max = Math.max(...numbers);
  const min = Math.min(...numbers);

  return { max, min };
}

const myNumbers = [23, 5, 89, 12, 44, 102, 3];

const { max, min } = findMinMax(...myNumbers);

console.log("Maximum Value:", max);
console.log("Minimum Value:", min);

const moreNumbers = [500, 10, 250];
const result2 = findMinMax(...moreNumbers);
console.log("New Max:", result2.max);
console.log("New Min:", result2.min);
