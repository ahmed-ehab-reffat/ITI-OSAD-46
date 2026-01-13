// console.log("hello");

//variables
// var myName = 'menna';//string
// var myAge = 30;//number
// var isAbsent = true;//boolean
// var n = null;//null
// var x;//undefiend

// var person1 = true;
// var person2 = false;
// var person3 = null;
// var person4;//undefiend
// console.log(myName);
// console.log(person3);
// console.log(person4);
// myName = 30;
// myAge = null;
// console.log(typeof isAbsent);
// isAbsent = "hamada";
// console.log(typeof isAbsent); //return string "undefiend" "object" "number" "string" "boolean"

// console.log(x);
// var x = 50;
// var y = 6;
// var str = "menna";
// var str2 = "shata";
// var x = 10;
// var y = "20";
//  console.log(x-y);
// console.log(str-str2);
// console.log(str+x);//string
// console.log(x+false);//booean true 1 false 0
// console.log(x+undefined);//Not A Number
// console.log(typeof NaN);
// console.log(typeof x);

// console.log(3<2<1);//false<1  0<1


// var x = "menna";
// var age = 30;

// // console.log(x=="menna" && age<20);//true&&false
// console.log(age!="30");//==
// console.log(age!=="30");//===

//if
// var x = "";
// if(x){
//     console.log("done");
// }
// else{
//     console.log("bye");
// }

//for
// for(var i=0;i<5;i++){
//     console.log(i);
//     //i++
// }
// console.log(i);//5

// var i = 20;

//input output
// alert("hello to my site");
// document.write("<h1 style='color:red'>hello my site</h1>");

//input
// var res = confirm("are you sure");
// console.log(res);//boolean

// var res = prompt("enter your age");
// // console.log(res);//value==>ok "" string cancel==>null
// //"30" "menna"
// if(res && isFinite(res)){
//     res = parseInt(res);
//     console.log(res+2);
// }
// else{
//     console.log("bye");
// }
// var x = 30;
// var y = 10;
do{
    var age = prompt("enter your age");

}while(!age || isNaN(age));//isNaN(null)
alert("your age is " + age);
//!null || isNaN(null) true||false
//!"" || isNaN("") true||false
//!"menna" || isNaN("menna") false||true
//!"30" || isNaN("30")   false||false