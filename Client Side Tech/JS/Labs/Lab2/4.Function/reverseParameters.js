function reverseParameters(...args) {
  return args.reverse();
}

var arr1 = reverseParameters(1, 2, 3, 4);
console.log(arr1);

var arr2 = reverseParameters("a", "b", "c");
console.log(arr2);
