//problem
// function first(){
//     console.log("first");
//     second();

// }

// function second(){

//     setTimeout(function(){
//         console.log("second");
//         console.log("end");

//     },2000);

// }
//unreadble 
//callback hell
// first();
// var ids;
// setTimeout(() => {
//     ids = [100,200,300];//creation data
//     console.log(ids);//using data

//             setTimeout(() => {
//                 var user ={
//                     id: ids[0],
//                     name:"hamada"
//                 }
//                 console.log(user);

//                             setTimeout(() => {
//                                 var address={
//                                     name:user.name,
//                                     city:"ismailia"
//                                 }
//                                 console.log(address);

//                             }, 1000);


//     }, 500);

// }, 1000);

// console.log(ids);


//promises code
var getIds = new Promise(function (resolve, reject) {
    //create data
    setTimeout(() => {
        var ids;
        // = [100,200,300];
        if (ids) {
            resolve(ids);

        }
        else {
            reject("error to get ids ");
        }

    }, 2000);


});
//promise user
function getUserData(userId) {
    var getUser = new Promise((res, rej) => {
        setTimeout(() => {
            var user = {
                id: userId,
                name: "menna"
            }
            if (user) {
                res(user);
            }
            else {
                rej("error to get user");
            }

        }, 500);

    })
    return getUser;
}
//promise address
function getAddress(userName) {
    return new Promise((res, rej) => {
        setTimeout(() => {
            var address = {
                name: userName,
                city: "ismailia"
            }
            res(address);

        }, 1000);

    })
}
// getIds.then((ids)=>{
//     //use data
//     console.log(ids);
//    return getUserData(ids[1]);
// })
// .then((u)=>{
//     //user 
//     console.log(u);
//     return getAddress(u.name)

// })
// .then((add)=>{
//     console.log(add);

// })
// .catch((e)=>{
//     alert(e);
// })

//es8 async await 

// getUserData(200).then((u)=>{
// console.log(u);
// });//return promise
// getAddress("hamada").then((add)=>{
//     console.log(add);

// })
var ids;
(async function () {
    try {

        ids = await getIds;
        console.log(ids);
        var user = await getUserData(ids[1]);
        console.log(user);
        var add = await getAddress(user.name);
        console.log(add);
    } catch (e) {
        alert(e);

    }

})();