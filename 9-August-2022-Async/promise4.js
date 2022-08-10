function pun(){
    return new Promise((resolve, reject) =>{
        setTimeout(function(){
            console.log("some work is successfully done");
            resolve("work done!!!");
        }, 5000);
    })
}


let myPromise = pun();

myPromise.then(function(data){
    console.log(data);
    return data;
}).then(function(data){
    console.log(data);
    return data;
}).then(function(data){
    console.log(data);
    return data;
}).then(function(data){
    console.log(data);
    return data;
}).then(function(data){
    console.log(data);
    return data;
}).then(function(data){
    console.log(data);
    return data;
});