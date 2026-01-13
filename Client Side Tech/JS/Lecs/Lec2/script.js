//switch
// var x= "menna";
// switch(x){
//     case 5:console.log("hello");
//     break;
//     case "Menna":console.log("data");
//     break;
//     default:console.log("defualt");
// }

//////////////////////
//class===> function constructor
//built in objects
//String 
// var strObj = new String("hamada elgen");
// console.log(strObj);
// // console.log(strObj[2]);
// // for(var i=0;i<strObj.length;i++){
// //     console.log(strObj[i]);
// // }
//  var str = "hamada";//more efficient
//  console.log(str.startsWith("h"));
// console.log(str);

// var c = new Boolean();
// console.log(c);

// var n = new Number();
// console.log(n);

//regular expression class (string)
//var regxEmail = new RegExp(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
//  var regxEmail = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
// // var res = regxEmail.test("hamada@gmail.com");
// // console.log(res);
//  var email = prompt("enter your email");
// if(regxEmail.test(email)){
//     alert("done");
// }
// else{
//     alert("worng");
// }
// var x = "0102356";
// //"example10@example.com"

/////Math static class (not a constructor);
// var n = new Math();
// console.log(Math.pow(2,3));
// console.log(Math.max(2,3,10,100,30,1));
// console.log(parseInt(Math.random()*10)+1);

//Array Object
// var arr = new Array();
// var arr1 = [1,2,"menna",true,[20,30]];
// // arr1[12] = "menna";
// arr1.push("menna");
// arr1.unshift("start")
// console.log(arr1);
// console.log(arr[5]);//undefiend 
// console.log(arr1[arr1.length-1][0]);
// console.log(arr1[2].startsWith("m"));
// for(var i=0;i<arr1.length;i++){
//     console.log(arr1[i]);
// }

// console.log(arr1.reverse());

// var arr= [1,2,3];
// // var arrCopy = [];
// // for(var i=0;i<arr.length;i++){
// //     arrCopy.push(arr[i]);
// // }
// // arrCopy.push("end");
// // console.log(arr);
// // console.log(arrCopy);
// document.write(arr.join("+"));

// var d = new Date(2026,12,3);
// var d = new Date("13/3/2026");
// //==> string MM/DD/YYYY
// //0     11==> number yyyy,MM,DD
// console.log(d);
// console.log(d.getMonth());//0   11
// console.log(d.getDay());//0    6
// console.log(d.getFullYear())

////////function////////////

//function statement
// var x = new Function();
// function myFunc(x,y){
//     //var x;
//     //function body
    
//     return x+y;
//     //return undefiend
// }

// //calling
// var res = myFunc("hello");
//  console.log(res);
// myFunc("bye",10);
// myFunc(2,10,30);
// myFunc();

// function sum(x,y){
//     if(arguments.length!==2){
//         throw("arguments number should be 2");
//     }
//     if(typeof x!=="number" || typeof y!=="number"){
//         throw("function parameters should be numbers");
//     }
//    return x+y;
// }
// function sum(){
//     console.log(arguments);
//     var sumData = 0;
//     for(var i=0;i<arguments.length;i++){
//         sumData+=arguments[i];
//     }
//     return sumData;

// }
// console.log(sum);
//  console.log(sum("100",30,60));
// throw("error in code");
// console.log("hello");

//function expression

// var x = function(){
//     console.log("hello");
//     return 20;
// }
// // x();
// console.log(x());


/////variable scope
// var x = 30; //global
// function myFunc(){
//     var x = "menna";//local shadwing
//     console.log(x);//20
// }

// myFunc();
// console.log(x);//30

// x = 20;
// console.log(x);
// function myFunc(){

//     x = 20;//globaaaaaaaaaaaaaal
//     console.log(x);
// }
// myFunc();
// console.log(x);

//////hoisting//////////
//var x;
// //var myfunc;
// //myfunc{}
// console.log(x);//undefiend
// var x =10;
// console.log(myfunc);
// var myfunc = function(){
//     console.log("hello");
// }
// myfunc();
// // function myfunc(){
//     console.log("hello");
// }