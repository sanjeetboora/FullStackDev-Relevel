
function compare(a, b){
    if(a > b){
        return 1;
    }
    else if(a < b){
        return -1;
    }
    return 0;
}


// 2-1 => +ve value
// 1- 2 => -ve value
// 1-1 => 0 value
let compare1 = (a, b) => a-b;

//for decreasing order
function compareDecreasing(a, b){
    if(a < b){
        return 1;
    }
    else if(a > b){
        return -1;
    }
    return 0;
}

let compare2 = (a, b) => b-a;

//compare function for 2D array
function compare2d(a, b){
    return a[1] - b[1];
}

let arr = [69, 45, 90, 46, 78, 22, 10, 5];
let arr1 = [
    [45, 68], 
    [90, 46], 
    [22, 78], 
    [10, 5]
];


console.log(arr1);
arr1.sort(compare2d);
console.log(arr1);


let compareString = (a, b) => b.localeCompare(a);
let compareChar = (a, b) => b[0].localeCompare(a[0]);
let arr2 = ["cjdsfl", "hkfdshfk", "fflhdsl", "fhlldsf"];
console.log(arr2);
arr2.sort(compareString);
console.log(arr2);

