function countingSortForNegativeAndPositiveElements(arr){
    let n = arr.length;
    let maxEle = Math.max(...arr);
    let minEle = Math.min(...arr);
    let freqArr = new Array(maxEle-minEle+1).fill(0);
    let output = new Array(n);
    //calculate the frequency of all elements
    for(let i=0; i<n; i++){
        let idx = arr[i]-minEle;
        freqArr[idx]++;
    }

     //let's take the prefix sum of all the frequencies
    for(let i=1; i<freqArr.length; i++){
        freqArr[i] += freqArr[i-1];
    }

    for(let i=n-1; i>=0; i--){
        const ele = arr[i];
        const idx = ele-minEle;
        const correctIndex = freqArr[idx] - 1;
        output[correctIndex] = ele;
        freqArr[idx]--;
    }

    return output;
}

let arr = [4, -5, -2, -3, 1, -2, 4, -5, -2, -7, 6, 3];
console.log(arr);
let sortedArr = countingSortForNegativeAndPositiveElements(arr);
console.log(sortedArr);