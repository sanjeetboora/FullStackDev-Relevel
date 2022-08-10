let myPromise = new Promise((resolve, reject) => {
    let success = false;
    if(success){
        resolve("resolved data");
    }else{
        reject("rejected data");
    }
})

myPromise.then(function(data){
    console.log(data);
})
.then((info) =>{
    console.log(info);
});

myPromise.catch(function(data){
    console.log(data);
});

myPromise
.then(myDisplay)
.then(myDisplay)
.then(myDisplay)
.then(myDisplay)
.catch(myDisplay);








// myPromise
// .then(function(data){
//     console.log(data);
//     // return "for 2nd then " + data;
// }) //returning a promise
// .then(myDisplay)//returning  a promise
// .then((data) => {
//     console.log("myData",data);
// })


function myDisplay(info){
    console.log("mydisplay", info);
    return "for 3rd then " + info;
}





// function xyz(data){
//     console.log(data);
//     return "for 2nd then " + data;
// }