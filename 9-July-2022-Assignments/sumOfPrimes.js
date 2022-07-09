function createSieve(sieve, n){
    // sieve.push(false);//0
    // sieve.push(false);//1
    sieve[2] = true;//2
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
}


function printSumofPrimes(sum, sieve){
    for(let x = 2; x <= sum/2; x++){
        let firstNumber = x;
        let secondNumber = sum-x;
        if(sieve[firstNumber] == true && sieve[secondNumber]){
            console.log(firstNumber, secondNumber);
            return;
        }
    }
    console.log("prime no. pair doesn't exists");
}


function main(){
    let sieve = new Array(1000);
    createSieve(sieve, 100);
    let sum = 11;
    printSumofPrimes(sum, sieve);

}
main();