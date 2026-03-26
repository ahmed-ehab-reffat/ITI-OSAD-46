var arr = [1996,1995,2010,2007];

//for if(true) new Array

//filter
var newArr = arr.filter(el=>el>1996);

//find
var ele = arr.find(el=>el>2010);
console.log(ele);

//findIndex
var index = arr.findIndex(el=>el<1996);
console.log(index);

//for experssion 2026-arr[i] newArray

//map
var arr = arr.map((el)=>2026-el)
console.log(arr);
//static

console.log(Array.from("hamada"));//iterators
console.log([]);