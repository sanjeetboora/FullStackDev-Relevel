function insertionSort(arr, n){
   for(let i = 1; i<n; i++){
        let x = arr[i];
        let j = i-1;
        while(j >= 0 && arr[j] > x){ //shiting greater than x elements on right 
            arr[j+1] = arr[j]; //right shift jth element
            j--;
        }
        arr[j+1] = x;
    }
}

let arr = [40, 20, 10, 30, 5, 25];
let n = 6;
console.log(arr);
insertionSort(arr, n);
console.log(arr);