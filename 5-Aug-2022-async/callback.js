// function greeting(name){
//     console.log("Hi", name);
// }




//greeting("Lakshmi");

function student(fun){ //fun => function
    fun("Geeta");
}


student(function(x){
    console.log(x);
});

// student((y) => {
//     console.log(y);
// })

// function print(x){
//     console.log(x);
// }

// student(print);



// student(greeting()); //you are not supposed to call the function
// greeting() //calling a function



let arr = [6, 4, 2, 8, 3];
// arr.sort(function(a, b){
//     return a-b;
// })
// arr.sort((a, b) => {
//     return a-b;
// })

// arr.sort((a, b) => a-b);

// let compare = (a, b) => {
//     return a-b;
// }
// arr.sort(compare);

// console.log(arr);

arr.forEach(element => {
    console.log(element);
});