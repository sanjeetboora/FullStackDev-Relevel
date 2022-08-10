async function pun(){
    return new Promise((resolve, reject) =>{
        setTimeout(function(){
            console.log("some work is successfully done");
            resolve("work done!!!");
            //reject("work not done!!!");
        }, 5000);
    });
};
async function pun1(){
    return new Promise((resolve, reject) =>{
        setTimeout(function(){
            console.log("pun2");
            resolve("work done!!!");
            //reject("work not done!!!");
        }, 8000);
    });
};

// function display(){
//     console.log("display");
// }
// // async function handler(){
// //     console.log("earlier");
// //     try{
// //         let myPromise = await pun();
// //         myPromise.then(function(data){
// //             console.log(data);
// //         });
// //         display();
// //         console.log(typeof myPromise);
// //         console.log(myPromise);
// //     }
// //     catch(err){
// //         console.log(err);
// //     }
    
// //     console.log("later");
// // }

// // handler();

// let x = pun();
// x.then((data)=>{
//   console.log(data);
// });


const promise1 = Promise.resolve("MyData");
const promise2 = "100";
const promise3 = pun(); 
const promise4 = pun1();


Promise.all([promise1, promise3, promise2, promise4]).then((values) =>{
  console.log(values);
})

