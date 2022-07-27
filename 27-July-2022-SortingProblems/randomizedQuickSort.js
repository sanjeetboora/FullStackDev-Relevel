function swap(arr, x, y){
    let temp = arr[x];
    arr[x] = arr[y];
    arr[y] = temp;
}

function getRandom(min, max){
    return parseInt(min + (Math.random() * (max-min)));
}

function partition(arr, start, end){ 
    //take random pivot
    let randomIdx = getRandom(start, end+1);
    let pivot = arr[randomIdx];
    while(start < end){
        while(arr[start] > pivot){//for decreasing order
            start++;
        }

        while(arr[end] < pivot){//for decreasing order
            end--;
        }
        if(start <= end){
            swap(arr, start, end);
        }
    }
    return start;
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



