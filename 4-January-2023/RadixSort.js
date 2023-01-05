function countingSort(arr, decimalPlace){
    let n = arr.length;
    let freqArr = new Array(10).fill(0);
    let output = new Array(n);
    //calculate the frequency of all elements
    for(let i=0; i<n; i++){
        let ele = arr[i];
        let digit = Math.floor((ele/decimalPlace)%10);
        freqArr[digit]++;
    }

     //let's take the prefix sum of all the frequencies
    for(let i=1; i<freqArr.length; i++){
        freqArr[i] += freqArr[i-1];
    }

    for(let i=n-1; i>=0; i--){
        const ele = arr[i];
        let digit = Math.floor((ele/decimalPlace)%10);
        const correctIndex = freqArr[digit] - 1;
        output[correctIndex] = ele;
        freqArr[digit]--;
    }

    for(let i=0; i<n; i++){
        arr[i] = output[i];
    }
}


function radixSort(arr){
    let maxEle = Math.max(...arr);

    //loop should run no. of digit times
    for(let decimalPlace = 1; Math.floor(maxEle/decimalPlace) > 0; decimalPlace *= 10){
        countingSort(arr, decimalPlace);
        console.log(arr, " after ", decimalPlace, " sorted");
    }
}

let arr = [45, 21, 90, 564, 782, 987, 444, 354, 90, 563];
radixSort(arr)
console.log(arr);


// 1987
// 1
// 10
// 100
// 1000
// 10000

// 1987/1000 => 1
// 1987/10000 => 0

// digitPlace
// 1
// 10
// 100
// 1000