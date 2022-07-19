let inversionCount = 0;
function merge(arr, start, mid, end){
    let leftStart = start, leftEnd=mid; // left part => start -  mid
    let rightStart= mid+1, rightEnd =end;// right part => mid+1 - end

    let leftArr = [], rightArr = [];
    for(let x =leftStart; x<= leftEnd; x++){
      leftArr.push(arr[x]);
    }

    for(let x = rightStart; x<= rightEnd; x++){
       rightArr.push(arr[x]);
    }

    let i=0, j=0, m=leftArr.length, n=rightArr.length;
    let k = start;
    while( i<m && j<n){
        if(leftArr[i] <= rightArr[j]){
            arr[k] = leftArr[i];
            i++;
            k++;
        }
        else{
            inversionCount += (m-i);
            arr[k] = rightArr[j];
            j++;
            k++;
        }
    }

    //remaining elements in arr1, push them in resultArr
    while(i<m){
        arr[k] = leftArr[i];
        i++;
        k++;
    }

     //remaining elements in arr2, push them in resultArr
     while(j<n){
        arr[k] = rightArr[j];
        j++;
        k++;
    }
}

function mergeSort(arr, start, end){
    //base case
    if(start >= end){
        return;
    }
    let mid = parseInt((start+end)/2); //self work
    //recursive work
    mergeSort(arr, start, mid); //sort left half
    mergeSort(arr, mid+1, end); //sort right half
    //self work
    merge(arr, start, mid, end); //merging left sorted half and right sorted half
}


// start < end => some elements from start to end
// start == end => only one element
// start > end => no elements

let arr = [5, 9, 4, 6, 2];
console.log(arr);
mergeSort(arr, 0, 4);
console.log(arr);

console.log(inversionCount);