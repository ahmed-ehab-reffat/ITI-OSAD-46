//dom
{/* <Employee>
    <name>hamada</name>
    <age>25</age>
    <salary>1000</salary>

</Employee> 
<Employee>
    <name>hamada</name>
    <age>25</age>
    <salary>1000</salary>

</Employee>
<Employee>
    <name>hamada</name>
    <age>25</age>
    <salary>1000</salary>

</Employee>
<Employee>
    <name>hamada</name>
    <age>25</age>
    <salary>1000</salary>

</Employee>
*/}
//JSON js Object notation
// `{
//     "name":"menna",
//     "age":25,

// },
// {
//     "name":"menna",
//     "age":25,

// }`
//convert from json to js object
// JSON.parse(jsonObj)//return js object
// //convert from js object to json
// JSON.stringify(jsObj)//return json

//ajax request //async js and xml
//native code
//fetch
//jquery
//angular react
// function getUser() {

//     var xhr = new XMLHttpRequest();
//     var users;
//     console.log(xhr);
//     xhr.open("get", "https://jsonplaceholder.typicode.com/users");
//     xhr.send();//json object
//     xhr.addEventListener("readystatechange", function () {
//         if (xhr.readyState == 4 && xhr.status == 200) {
//             users = JSON.parse(xhr.response);
//             // console.log(users[1].name)
//             userUi(users);
//         }
//         //0 1 2 3 4
//     })
// }

// function userUi(arr){
//     console.log(arr);
// }

//es6 fetch
(async function(){

    var res = await fetch("https://jsonplaceholder.typicode.com/users");
    // console.log(res);
    var users = await res.json();
    console.log(users);
    userUi(users);
})();

// res.then((r)=>r.json()).then((u)=>{
//     console.log(u);

// })
function userUi(arr){
    arr.forEach(element => {
        document.body.innerHTML += element.name;
        
    });
}
