//parent 
//ref self envoked function
import U from "./User class.js";

export default class Employee extends U{
    constructor(n,a,s){
        //inhert name age
        super(n,a);

        this.salary = s;

    }
    //inhert print
    //override
    print(){
        console.log("hello iam employee");
    }
    toString(){
        return this.name;
    }

    calcSalary(b){

        return this.salary + b;
    }
}

export class Student extends U{
    constructor(n,a,g){
        //inhert name age
        super(n,a);

        this.grades = g;

            }
    //inhert print

    calcMyGrades(b){

        return this.grades + "%";
    }
}
// console.log("hello");
var x = 5;
