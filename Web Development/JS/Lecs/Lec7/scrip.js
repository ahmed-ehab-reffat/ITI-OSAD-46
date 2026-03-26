//object properties methods

//m3dom elhwia [object Object ] [Array Object]
// var obj = {name:"menna",print:function(){
//     console.log("hello");
// }};
// var obj2 = new Object();

// obj.age = 32;
// console.log(obj.name);
// obj.address = {city:"cairo",country:"egypt"};
// console.log(obj.address.country)

// obj.calcSalary = function(){
//     console.log("func 2");
// }
// obj.print();
// obj.calcSalary();
// delete obj.name;//delete property
// //subscribe notation
// //get
// // var k = "age";
// // obj[k] = 60;//set
// // console.log(obj["age"]);
// console.log(obj.salary);//get not existed property
// //loop 
// for (let key in obj) {
//     console.log(key);//type of "age" "print"
//     console.log(obj[key]);
   
    
    
// }
// var newObj  = {
//     name:"",
//     age:
// }

// var person = {
//     name:"menna",
//     age:23,
//     print:function(){
//         //this==person
//         // function test(){
//         //     console.log(this.name,this.age);
//         // }
//         // setTimeout(test.bind(this),1000);
//         setTimeout(function(){
//              console.log(this.name,this.age);

//         }.bind(this),1000);
//     }
// }
// var employee ={
//     name:"hamada",
//     age:30,
//     salary:2000
// }
// person.print();
// person.print.call(employee);//caller refer keyword function caller


//change function caller
// var str= "menna";

// // [].forEach.call(str,function(el){
// //         console.log(el);
// // });
// // [].forEach.apply(str,[function(el){
// //     console.log(el)
// // }]);
// var newFunc = [].forEach.bind(str,function(el){
//     console.log(el);

// });

// newFunc();
// newFunc();



//factory==> classes
//function is the first class object


// function Employee(n,a,s){
//     this.name = n;
//     this.age = a;
//     this.salary = s;
//     //
    
//     // this.print = function(){
//     //     console.log(this.name,this.age);
//     // }
// //return {}
// }
// // Employee.myStaticMethod = function(){

// }
// Employee.myStaticMethod();
// Employee.prototype.print = function(){
//   console.log(this.name,this.age);

// }

// var emp  = new Employee("menna",25,2000);

// var emp2 = new Employee("hamada",30,6000);
// console.log(emp2);
// emp.print();
// emp2.print();


// console.log(Employee.prototype.constructor);
// console.log(emp.constructor);

// var arr = [];
// //new Array();

//es6 classes

class Employee{
    //optional
    // name;
    // age;
    // salary;
     #name;//private
    constructor(n,a=0,s=0){
        if(typeof n !=="string"){
            throw("error")
        }
        this.#name = n;
        this.age = a;
        this.salary = s;
        // this.print = function(){
        //         console.log(this.#name,this.age);

        // }


    }

    set name(v){
          if(typeof v !=="string"){
            throw("error")
        }
        this.#name = v;

    }
//methods
    print(){
        console.log(this.#name,this.age);
    }

    static myStaticMethod(){
        console.log("hello to my static method");

    }


}

//use static method
// Employee.myStaticMethod();
// var emp = new Employee("menna",25);
// // console.log(emp);
// emp.print();
// var emp2 = new Employee("hamada");
//  emp2.name = "ahmed";// private error
// emp2.#name = 25;
// emp2.name = "ahmed";
// emp2.setName = "ahmed";
// emp2.setName = "ahmed";

// var a = emp.#name;
// console.log(emp.name);

//static class//static methods
// console.log(Math);
// console.log(Array.from);//static method

class myStaticClass{
    constructor(){
        throw("not a constructor");

    }

    static x = 5;
    static myFunc(){
        console.log("hello");
    }

}
// var n = new myStaticClass();
// console.log(n);
myStaticClass.myFunc();