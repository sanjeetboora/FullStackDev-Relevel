function swap(arr, x, y){
    let temp = arr[x];
    arr[x] = arr[y];
    arr[y] = temp;
}
function partition(arr, start, end){
    let pivot = arr[end];
    let smaller = start; //every element less than pivot is on left side of smaller

    for(let i = start; i < end; i++){
        if(arr[i] < pivot){
            swap(arr, i, smaller);
            smaller++;
        }
    }
    //place pivot at it's correct position
    swap(arr, end, smaller);
    return smaller;
}

function quickSort(arr, start, end){ 
    if(start >= end){
        return;
    }

    let pivotIdx = partition(arr, start, end);
    quickSort(arr, start, pivotIdx-1);//left part
    quickSort(arr, pivotIdx+1, end);//right part
}

let arr = [7, 3, 1, 2, 9, 6, 8, 4, 5];
console.log(arr);
quickSort(arr, 0, 8);
console.log(arr);



