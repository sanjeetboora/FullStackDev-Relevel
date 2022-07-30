const factorial= (x) =>{
    let result = 1;
    for(let i =1 ; i<=x; i++){
        result*= i;
    }
    return result;
}


module.exports = factorial;