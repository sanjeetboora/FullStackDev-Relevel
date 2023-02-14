/*
Max Heap
 (a,b)=>{
     return a<b;
 }

 Min Heap
 (a,b)=>{
     return a>b;
 }

*/

class Heap{
    constructor(comparator){
        this.heap = [];
        this.comparator = comparator;
        this.currSize =0;
    }

    size(){
        return this.heap.length;
    }

    upHeapify(idx){
        let parentIdx = Math.floor((idx-1)/2); 
        while(parentIdx >= 0 && this.comparator(this.heap[parentIdx], this.heap[idx])){
            //swap the elements at idx and parent idx
            let temp = this.heap[idx];
            this.heap[idx] = this.heap[parentIdx];
            this.heap[parentIdx] = temp;

            idx = parentIdx;
            parentIdx = Math.floor((idx-1)/2); 
        }
    }

    downHeapify(){
        let parentIdx = 0;
        while(parentIdx < this.currSize){
            let leftChildIdx = 2*parentIdx+1;
            let rightChildIdx = 2*parentIdx+2;

            //if left child doesn't exist
            if(leftChildIdx >= this.currSize){
                return;
            }
            
            if(rightChildIdx >= this.currSize){ //no right child exist
                //if only left child exist
                if(parentIdx>=0 && this.comparator(this.heap[parentIdx],this.heap[leftChildIdx])){
                    let temp = this.heap[parentIdx];
                    this.heap[parentIdx] = this.heap[leftChildIdx];
                    this.heap[leftChildIdx] = temp;
                }
                parentIdx = leftChildIdx;
            }else{ //right child exist
                let highestPriorityIdx =  this.comparator(this.heap[rightChildIdx], this.heap[leftChildIdx]) ? leftChildIdx:rightChildIdx;
                if(parentIdx >=0 && this.comparator(this.heap[parentIdx], this.heap[highestPriorityIdx])){
                    let temp = this.heap[parentIdx];
                    this.heap[parentIdx] = this.heap[highestPriorityIdx];
                    this.heap[highestPriorityIdx] = temp;
                }
                else{ //parent is having highest priority
                    return;
                }
                parentIdx = highestPriorityIdx;
            }
        }
    }

    insert(val){
        //push val in the array
        this.heap.push(val);
        
        //perform upheapify to take the node at it's correct position
        let currIdx = this.heap.length-1;
        currIdx > 0 && this.upHeapify(currIdx);
        this.currSize++;
    }

    getTop(){
        if(this.currSize <= 0){
            return "No elements in heap";
        }
        return this.heap[0];
    }

    pop(){
        if(this.currSize <= 0){
            return "No elements in heap";
        }
        //swap root with last node
        let temp = this.heap[0];
        this.heap[0] = this.heap[this.currSize-1];
        this.heap[this.currSize-1] = temp;

        this.heap.pop();
        this.currSize--;

        //restore the heap
        this.downHeapify();
    }

    display(){
        let result = "";
        for(let i=0; i<this.currSize; i++){
            result += (this.heap[i] + " ");
        }
        console.log(result);
    }
}

let maxHeapComparator = (a,b)=>{
    return a.count < b.count;
}
function sortCharactersByFrequency(str){
    let freqMap = {};
    for(let i = 0; i<str.length; i++){
        let currChar = str[i];
        if(freqMap[currChar]){
            freqMap[currChar]++;
        }
        else{
            freqMap[currChar] = 1;
        }
    }
     let maxHeap = new Heap(maxHeapComparator);
     for(x in freqMap){
        maxHeap.insert({"char": x, "count": freqMap[x]});
    }
    let resultStr = "";
    while(maxHeap.size() > 0){
        let currEle = maxHeap.getTop();
        maxHeap.pop();

        while(currEle.count > 0){
            resultStr+= currEle.char;
            currEle.count--;
        }
    }
     return resultStr;
}

// const str = "tree";
// console.log(sortCharactersByFrequency(str));

let minHeapComparator = (a,b)=>{
    return a.ele > b.ele;
}
function mergeKSortedArrays(arr){
    let minHeap = new Heap(minHeapComparator);

    for(let i=0; i<arr.length; i++){
        minHeap.insert({"ele": arr[i][0] ,"arrNum": i,"index": 0});
    }
    let result = [];
    while(minHeap.size() > 0){
        let min = minHeap.getTop();
        result.push(arr[min.arrNum][min.index]);
        minHeap.pop();
        min.index+1 < arr[min.arrNum].length && minHeap.insert({"ele": arr[min.arrNum][ min.index+1], "arrNum": min.arrNum,"index":  min.index+1});
    }
    return result;
}


let arr = [
    [1,4,5],
    [1,3,4],
    [2,6]
];
let res = mergeKSortedArrays(arr);
console.log(res);


