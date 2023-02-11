function longestConsequetiveSequence(arr){
    let map = new Map();
    for(let i=0; i<arr.length; i++){
        let ele = arr[i];
        if(map.has(ele-1)){
            map.set(ele, false); //not the best candidate to start consecutive sequence
        }else{
            map.set(ele, true);//one of the best candidate to start consecutive sequence
        }
        if(map.has(ele+1)){
            map.set(ele+1, false);
        }
    }
    let maxlength = 0;
    let maxSequenceStartingNumber = 0;

    for(const key of map.keys()){
        if(map.get(key) == true){
            let startNo = key;
            let sequenceLenCount = 0;
            while(map.has(startNo+sequenceLenCount)){
                sequenceLenCount++;
            }
            if(sequenceLenCount > maxlength){
                maxlength =sequenceLenCount;
                maxSequenceStartingNumber = key;
            }
        }
    }

   // return maxlength; //only to return max length
   let result = [];
   for(let x = maxSequenceStartingNumber; x< maxSequenceStartingNumber+maxlength; x++){
        result.push(x);
   }
   return result;
}


let arr = [0,3,7,2,5,8,4,6,0,1];
console.log(longestConsequetiveSequence(arr));