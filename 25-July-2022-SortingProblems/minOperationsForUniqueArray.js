function minOperation(arr, n){
   // arr.sort((a, b) => a-b);
    let freqMap = {};
    let maxNumber = 0;
    for(let i=0; i<n; i++){
        let currEle = arr[i];
        maxNumber = currEle > maxNumber ? currEle : maxNumber;
        if(freqMap[currEle]){
            freqMap[currEle]++;
        }
        else{
            freqMap[currEle] = 1;
        }
    }
    let totalOperations = 0;
    let repeatedElements = 0;

    for(let i = 0; i <= (maxNumber+repeatedElements) && repeatedElements >= 0; i++){
        if(freqMap[i]){
            let duplicateOccurrences = freqMap[i]-1;
            repeatedElements += duplicateOccurrences;
            totalOperations += (-1 * i * duplicateOccurrences);
        }
        else if(repeatedElements > 0){ //replace one duplicate element with number i
            repeatedElements--;
            totalOperations += i;
        }
        //console.log(i, repeatedElements, totalOperations);
    }
    return totalOperations;
}






let arr = [1, 3, 7, 1, 10, 1, 3, 1, 10];
let n = 9;
console.log(minOperation(arr, n));