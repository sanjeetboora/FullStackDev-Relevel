function subsets(input, output){
    //base case
    if(input.length <= 0){
        console.log(output);
        return;
    }

    //self work
    let firstNumber = input[0];
    input.shift();
    //let restOfInput = input;
    //recursive calls
    subsets(input, output); //exclude
    output.push(firstNumber)
    subsets(input, output); //include


    input.unshift(firstNumber); //backtracking input
    output.pop();//backtracking output
}

let inputArr = [1, 2, 3];
let output = [];
subsets(inputArr, output);
