function swap(arr, x, y){ //swap elements at x and y index
    let temp = arr[x];
    arr[x] = arr[y];
    arr[y] = temp;
}

function selectionSort(arr, n){
    for(let start =0; start < n-1; start++){
        let minimumCandidateIdx = start;
        for(let i = start + 1; i < arr.length; i++){
            if(arr[i] < arr[minimumCandidateIdx]){
                minimumCandidateIdx = i;
            }
        }

        if(start != minimumCandidateIdx){
            swap(arr,start, minimumCandidateIdx);
        }
    }
}


let arr = [5, 2, 6, 1, 4, 10, 8];
let n = 7;
console.log(arr);
selectionSort(arr, n);
console.log(arr);