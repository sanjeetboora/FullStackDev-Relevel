function print(x){
    console.log(x);
}
function student(fun){ //fun => function
    fun("Geeta");
}

//synchronous callback
student(print);

//asynchronous callback
setTimeout(print, 5000, "Satish");
// for(let i=0; i<1000000000; i++){

// }
console.log("this is end");
console.log("this is end2");
