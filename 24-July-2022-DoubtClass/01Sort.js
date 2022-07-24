function swap(arr, x, y){
    let temp = arr[x];
    arr[x] = arr[y];
    arr[y] = temp;
}
function sort01(arr, n){
    let i = 0, j = n-1;
    while(i<j){
        if(arr[i] == 0){
            i++;
        }
        else{//arr[i] == 1
            swap(arr, i, j);
            j--;
        }
    }
}

let arr = [1, 0, 0, 1, 0, 1, 0, 1];
console.log(arr);
sort01(arr, arr.length);
console.log(arr);