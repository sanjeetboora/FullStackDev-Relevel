// function myCallback(){
//     console.log("Timed out");
// }

// const myTimeFun = () =>{
//     console.log("myTimeFunction");
//     return 10000;
// }

// let myTime = "4000";
// console.log("started");
//  setTimeout(myCallback, 0);
//  setTimeout(myCallback, myTimeFun);
// // setTimeout(myCallback, undefined);
// // setTimeout(myCallback, myTime);
// console.log("ended");





//inversion of control

//api of paypal
// function processCreditCard(cardDetails, chargeCreditCard){
//      console.log(cardDetails);
//      setTimeout(() => {
//         chargeCreditCard();
//         chargeCreditCard();
//      }, 5000);
// }

// function chargeCreditCard(){
//     console.log("5000 deducted from your account");
// }

// processCreditCard("myCardDetails",chargeCreditCard);


//solution of inversion of control => promise

function processCreditCardPromise(cardDetails){
    console.log(cardDetails);
    return new Promise((resolve, reject)=>
    {
        setTimeout(() => {
            resolve();
            resolve();
         }, 5000);
    })
}


function chargeCreditCard(){
   console.log("5000 deducted from your account");
}
// let x = processCreditCardPromise("myCardDetails");
// console.log(x);
// x.then(()=>{
//     chargeCreditCard();
// })



function myPrint(z){
    console.log(z);
    return z;
}
function myPromise(){
    return new Promise((resolve, reject)=>{
        setTimeout(() => {
            resolve("Resolved value");
            resolve("Resolved value1");
        }, 4000);
    })
}

// let y = myPromise();
// console.log(y);
// // y.then((val) =>myPrint(val));
// // y.then((a) =>myPrint(a));

// console.log("=========================");

// y
// .then((val) =>myPrint(val))
// .then((a) =>myPrint(a))
// .catch((error) =>myPrint(error));

async function myFun(){
    console.log("myFun started")
    let z = await myPromise();
    console.log(z);
    console.log("myFun ended");
}
myFun();