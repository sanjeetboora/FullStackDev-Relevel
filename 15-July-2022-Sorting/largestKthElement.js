function swap(arr, x, y){ //swap elements at x and y index
    let temp = arr[x];
    arr[x] = arr[y];
    arr[y] = temp;
}

function KthLargest(arr, n, k){ //using bubble sort
    for(let i = 0; i < k; i++){
        let swapDone = false;
        for(let j = 0; j < n-1-i ; j++){
            if(arr[j] > arr[j+1]){
                swap(arr, j, j+1);
                swapDone =true;
            }
        }
        console.log(i, "th iteration completed");
        console.log(arr);
        if(swapDone == false){
            return;
        }
    }
    return arr[n-k];
}

let arr = [5, 3, 4, 2, 1];
//let arr1 = [1, 2, 3, 4, 5];
console.log(KthLargest(arr, 5, 3));