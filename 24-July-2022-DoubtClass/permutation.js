function permutation(input, output){
    //base case
    if(input == ""){
        console.log(output);
        return;
    }

    for(let i=0; i<input.length; i++){
        let currChar = input[i];
        let restOfInput = input.substring(0, i) + input.substring(i+1);
        permutation(restOfInput, output+currChar);
    }
}

permutation("123", "");
