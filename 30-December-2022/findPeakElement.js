
function findPeakElement(arr, n){
    let low = 0;
    let high =n-1;

    while(low<=high){
        let mid = low+Math.floor((high-low)/2);

        if((mid==0 || arr[mid] > arr[mid-1]) &&  (mid==n-1 || arr[mid] > arr[mid+1])){
            return mid;
        }
        else if(arr[mid-1]> arr[mid]){ //move towards left
            high = mid-1;
        }
        else{//move towards right
            low = mid+1;
        }
    }
}

let arr = [1, 2, 1, 3, 5, 6, 10, 15, 8];
let n = 9;
let peakElementIndex = findPeakElement(arr, n);
console.log("index: ", peakElementIndex, " peakElement: ", arr[peakElementIndex]);