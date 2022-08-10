function fun(fun2){
    setTimeout(function(){
        fun2();
        fun2();
        fun2();
    }, 5000);
}

function fun2(){
    console.log("your money withdrawn");
}

//fun(fun2);




function pun(){
    return new Promise((resolve, reject) =>{
        setTimeout(function(){
            console.log("some work is successfully done");
            resolve("work done!!!");
        }, 5000);
    })
}


let myPromise = pun();

myPromise.then(fun2);
myPromise.then(fun2);
myPromise.then(fun2);
myPromise.then(fun2);
myPromise.then(fun2);
myPromise.then(fun2);





