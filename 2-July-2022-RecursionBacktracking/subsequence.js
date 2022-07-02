function subsequence(input, output){
    //base case
    if(input == ""){
        console.log(output);
        return;
    }

    //self work
    let firstChar = input[0];//input.charAt(0);
    let restOfInput = input.substring(1);
    //recursive calls
    subsequence(restOfInput, output); //exclude
    subsequence(restOfInput, output + firstChar); //include
}
subsequence("abc", "");

// input = "abc"
// let restOfInput = input.substring(1); => "bc"

// input = "bc"
// let restOfInput = input.substring(1); => "c"

// input = "c"
// let restOfInput = input.substring(1); => ""



