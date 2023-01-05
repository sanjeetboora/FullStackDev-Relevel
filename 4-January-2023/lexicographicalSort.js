function lexicographicalSort(arr){
    let n = arr.length;
    let freqArr = new Array(256).fill(0);
    let output = new Array(n);
    //calculate the frequency of all elements
    for(let i=0; i<n; i++){
        let idx = arr[i].charCodeAt(0);
        freqArr[idx]++;
    }

     //let's take the prefix sum of all the frequencies
    for(let i=1; i<freqArr.length; i++){
        freqArr[i] += freqArr[i-1];
    }

    for(let i=n-1; i>=0; i--){
        const ele = arr[i];
        const idx = arr[i].charCodeAt(0);;
        const correctIndex = freqArr[idx] - 1;
        output[correctIndex] = ele;
        freqArr[idx]--;
    }

    return output.join('');
}

let arr = "unacademy";
console.log(arr);
let sortedArr = lexicographicalSort(arr);
console.log(sortedArr);