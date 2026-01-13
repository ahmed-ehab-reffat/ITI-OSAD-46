// var divs = document.getElementsByClassName("myClass");
// var divs2 = document.querySelectorAll(".myClass");
// var newEle = document.createElement("div");
// newEle.setAttribute("class","myClass");
// newEle.textContent = "hello new";
// document.body.append(newEle);

//
var divs = document.querySelectorAll("div");

// divs[0].addEventListener("click",function(e){
//     if(this===e.target){

//         alert("hello iam red");
//     }
// })
// divs[1].addEventListener("click",function(e){
//    //  e.stopPropagation();
//    if(this===e.target){
//     alert("hello iam green");
//    }
// })
// divs[2].addEventListener("click",function(e){
//     //e.stopPropagation();
//     alert("hello iam yellow");
// });
///////BOM
console.log(window)
var newWind;
function openWin(){
     newWind = open("page2.html","");//return window object
    console.log(newWind);
}

function closeWin(){
   // window.close();
   newWind.close();

}

function printWin(){
    window.print();
}

function backWin(){
    history.back();
}
function forWin(){
    history.forward();
}
function goWin(){
    history.go(-3);
}
function replaceWin(){
    location.replace("page2.html");
}
// console.log(navigator.userAgentData.platform);//user agent data
// console.log(navigator.userAgentData.mobile);//user agent data

// var x = prompt("enter your name");
// console.log(x);
