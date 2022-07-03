function reverseArray(arr, start, end){
    //base case
    if(start >= end){
        return;
    }

    //self work
    let temp = arr[start];
    arr[start] = arr[end];
    arr[end] = temp;

    //recursive calls
    reverseArray(arr, start+1, end-1);
}
let arr = [10, 20, 30, 40, 50];
console.log(arr);
reverseArray(arr, 0, 4);
console.log(arr);