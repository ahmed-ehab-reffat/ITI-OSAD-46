//parent 

class User{
    constructor(n,a){
        if(this.constructor === User){
            throw("error this is an abstract")
            
        }
        this.name = n;
        this.age = a;
    }

    print(){
        console.log(this.name,this.age);
    }
}

class Employee extends User{
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

class Student extends User{
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

// var u = new User();//error 

var emp = new Employee("menna",25,3000);
emp.print();
document.write(emp);//toString()
emp.calcSalary();
var stu = new Student("hamada",20,60);
stu.print();