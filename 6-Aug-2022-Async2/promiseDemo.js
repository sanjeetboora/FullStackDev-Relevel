let myPromise = new Promise((resolve, reject) => {
    let success = true;
    if(success){
        resolve("resolved data");
    }else{
        reject("rejected data");
    }
})

myPromise.then(function(data){
    console.log(data);
});
myPromise.catch(function(data){
    console.log(data);
});