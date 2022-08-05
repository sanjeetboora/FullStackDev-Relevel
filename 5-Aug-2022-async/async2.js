console.log("execution started");
let startTime = Date.now();

setTimeout(function(){
    console.log("timeout is executed");
}, 0);

console.log("execution ended");
let endTime = Date.now();

console.log(endTime-startTime);