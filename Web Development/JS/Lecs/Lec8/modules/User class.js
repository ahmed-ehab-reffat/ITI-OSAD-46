export default class User{
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