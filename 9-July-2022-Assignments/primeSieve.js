let sieve = [];
let n = 100;
sieve.push(false);//0
sieve.push(false);//1
// //initially mark all numbers as Prime
// for(let i=2; i<=n; i++){
//     sieve.push(true);
// }

// for(let i=2; i<=n; i++){
//     if(sieve[i] == true){ // i is prime
//         //mark all the multiples of i as non prime or composite
//         for(let j = 2*i; j<= n; j += i){
//             sieve[j] = false;
//         }

//     }
// }
// //print all prime numbers
// for(let i=2; i<=n; i++){
//     if(sieve[i] == true){
//         console.log(i);
//     }
// }


//==========================================
// 1st optimization
// sieve[2] = true;
// //initially mark all odd numbers as Prime
// for(let i=3; i<=n; i+=2){
//     sieve[i]= true;
// }

// //check the multiples of odd numbers
// for(let i=3; i<=n; i+= 2){
//     if(sieve[i] == true){ // i is prime
//         //start from i*i as no prime numbers(multiples of i) which are smaller than i*i are already marked as non prime by other smaller prime numbers
//         for(let j = i*i; j<= n; j += i){
//             sieve[j] = false;
//         }
//     }
// }
// //print all prime numbers
// for(let i=2; i<=n; i++){
//     if(sieve[i] == true){
//         console.log(i);
//     }
// }



//==========================================
// 2nd optimization
sieve[2] = true;
//initially mark all odd numbers as Prime
for(let i=3; i<=n; i+=2){
    sieve[i]= true;
}

//check the multiples of odd numbers
for(let i=3; i*i<=n; i+= 2){
    if(sieve[i] == true){ // i is prime
        //start from i*i as no prime numbers(multiples of i) which are smaller than i*i are already marked as non prime by other smaller prime numbers
        for(let j = i*i; j<= n; j += (2*i)){
            sieve[j] = false;
        }
    }
}
//print all prime numbers
for(let i=2; i<=n; i++){
    if(sieve[i] == true){
        console.log(i);
    }
}
