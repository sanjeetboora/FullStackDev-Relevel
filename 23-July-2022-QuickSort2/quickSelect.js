function swap(arr, x, y){
    let temp = arr[x];
    arr[x] = arr[y];
    arr[y] = temp;
}
function partition(arr, start, end){
    let mid = Math.floor((start+end)/2);
    let pivot = arr[mid];
    console.log("start ", start, "end", end, "mid", mid, "pivot", pivot);
    while(start < end){
        while(arr[start] < pivot){
            start++;
        }

        while(arr[end] > pivot){
            end--;
        }
        if(start <= end){
            swap(arr, start, end);
        }
    }
    return start;
}

function quickSelect(arr, start, end, KthLargestIndex){ 
    if(start >= end){
        return;
    }

    let pivotIdx = partition(arr, start, end);
    console.log(arr);
    console.log(pivotIdx);
    if(pivotIdx == KthLargestIndex){
        return arr[KthLargestIndex];
    }
    else if(pivotIdx > KthLargestIndex){
        return quickSelect(arr, start, pivotIdx-1, KthLargestIndex);//left part
    }
    else{
        return quickSelect(arr, pivotIdx+1, end, KthLargestIndex);//right part
    }
}

function KthLargest(arr, n, K){
    let KthLargestIndex = n-K;
    quickSelect(arr, 0, n-1, KthLargestIndex);
    console.log(arr);
    return arr[KthLargestIndex];
}

let arr = [5, 8, 26, 78, 97, 56, 34, 54, 3, 45];
let K = 4;
let n = 10;
console.log(KthLargest(arr, n, K));