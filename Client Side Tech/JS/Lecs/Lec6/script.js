//var vs let const

//scope {}

// for (let i = 0; i < 5; i++) {
//     console.log(i);
// }

// console.log(i);


//hoisting
//throw("cant access")
// let x;
// console.log(x);
//  let x = 10;
// var x = 10;
// function test()
// {
//     //var x;local
//     console.log(x);//
//     let x = 20;//local

// }
// test();
// console.log(x);

//redcleartion

// let x = 10;
// // var x = 20;
// let x=5;

//let vs const

// {let x = 5;}
// console.log(x);
// let x;
// const z =10;
// x = 10;
// z=20;

// const arr = [1,2,3];
// arr.push("hello");
// arr[0] = "start"
// //  arr = "assfd";//

/// string 
// let n = "menna";
// let a =25;
// // var str = "my name is " + n + "iam age "+ a;
// var str = `my name is ${n} i am "age" ${2026-1994} `

//arrow function

// var myFunc = function(x,y){
//     return x+y;

// }

// var myFunc = (x,y)=>x+y;
// var myFunc1 = x=>x+1;
// console.log(myFunc(10,20))
// console.log(myFunc1(32));

// [1,2].forEach(element => {
//     console.log(element);
    
// });

//this==> function caller

// function test(){
//     console.log(this);
// }

// window.test();
//window
 var div = document.querySelector("div");
// div.addEventListener("click",function(){
//     // console.log(this);//div
//     //this pattern
//     // var _this = this;
//     //
//     setTimeout(()=>{
//         this.style.color = "red";
       
//     },2000);

// })

///destructing
var arr= ["f","a","b"];
// var x = arr[0];
// var y = arr[1];
// let [x,y,z,r] = arr;

// console.log(x);
// console.log(y);
// console.log(r);
// var str = "end";
// let [a1,a2,a3] = [1,"menna",str];


// function test(){
//     return ["start","end"];
// }

// let [res1,res2] = test();

// window.name =25;
// console.log(typeof window.name);
// let x= window.name;
// let test = window.test

// let {name:x,test:t} = window;

// div.addEventListener("click",function({target:t,clientX:x}){
//     //var t= e.target;
//   //  var x = e.clientX;
//     // console.log(e);
//     console.log(t);
//      console.log(x);

// })


///spread operator ...  rest parameters

// function test(a,...x){
//     console.log(a);
//     console.log(x);//array
//     // console.log(arguments);
// }

// test(1,2);
// test(3,2,1);
// test();


 var arr = [1,2,3];
// var arr2 = [4,5,6];
// var arr3 = [...arr,...arr2];
// console.log(arr3);
// console.log(Math.max(...arr3));

var arrcopy = [...arr];
// arr[3] = ...arr[3]
// arrcopy.push(arr[0]);
arrcopy.push("start");