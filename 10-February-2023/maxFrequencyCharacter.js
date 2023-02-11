function maxFrequencyChar(str){
    let freqMap = new Map();
    let maxFreq = 0;
    let maxFreqChar = '';
    for(ch of str){
        if(freqMap[ch]){
            let currFreq = freqMap[ch];
            freqMap[ch] = currFreq+1;
            if(freqMap[ch] > maxFreq){
                maxFreq = freqMap[ch];
                maxFreqChar = ch;
            }
        }else{
            freqMap[ch] = 1;
        }
    }   

    return maxFreqChar;
}

console.log(maxFrequencyChar("abcdbcbcdc"));