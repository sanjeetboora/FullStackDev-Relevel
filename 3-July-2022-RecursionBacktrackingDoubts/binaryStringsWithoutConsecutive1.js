function printAllBinaryStringWithoutConsecutive1s(input, output){
    if(input == 0){
        console.log(output);
        return;
    }

    printAllBinaryStringWithoutConsecutive1s(input-1, output + "0");
    //if last bit of output is 1 then don't add 1
    if(output[output.length-1] !== '1'){
        printAllBinaryStringWithoutConsecutive1s(input-1, output + "1");
    }
}

printAllBinaryStringWithoutConsecutive1s(3, "");




function countAllBinaryStringWithoutConsecutive1s(input, previousBit){
    if(input == 0){
        return 1;
    }

    let totalCount = countAllBinaryStringWithoutConsecutive1s(input-1, 0);
    //if last bit of output is 1 then don't add 1
    if(previousBit != 1){
        totalCount += countAllBinaryStringWithoutConsecutive1s(input-1, 1);
    }
    return totalCount;
}

let count = countAllBinaryStringWithoutConsecutive1s(3, 0);
console.log(count);





