function swap(arr, x, y){
    let temp = arr[x];
    arr[x] = arr[y];
    arr[y] = temp;
}
function dnf(arr, n){
    let start = 0, mid = 0, end = n-1;
    while(mid <= end){
        if(arr[mid] == 0){
           swap(arr, start, mid);
           start++;
           mid++;
        }
        else if(arr[mid] == 2){
            swap(arr, mid, end);
            end--;
        }
        else{//arr[mid] == 1
            mid++;
        }
    }
}

let arr = [1, 2, 0, 0,2, 1, 0, 2, 1, 0, 1];
console.log(arr);
dnf(arr, arr.length);
console.log(arr);