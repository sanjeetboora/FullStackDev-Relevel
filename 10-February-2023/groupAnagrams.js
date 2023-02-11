function groupAnagrams(strArr){
    let anagramMap = new Map(); //{}

    for(str of strArr){
        let sortedStr = str.split('').sort().join('');
        if(anagramMap[sortedStr]){
            anagramMap[sortedStr].push(str);
        }else{
            anagramMap[sortedStr] = [str];
        }
    }
    console.log(anagramMap);
    for(x in anagramMap){
        console.log(anagramMap[x]);
    }
}
let ele = ["eat","tea","tan","ate","nat","bat"];
groupAnagrams(ele);