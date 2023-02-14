class MaxHeap{
    constructor(){
        this.heap = [];
        this.currSize = 0;
    }

    size(){
        return this.heap.length;
    }

    upHeapify(idx){
        let parentIdx = Math.floor((idx-1)/2); 
        while(this.heap[parentIdx] < this.heap[idx]){
            //swap the elements at idx and parent idx
            let temp = this.heap[idx];
            this.heap[idx] = this.heap[parentIdx];
            this.heap[parentIdx] = temp;

            idx = parentIdx;
            parentIdx = Math.floor((idx-1)/2); 
        }
    }

    downHeapify(parentIdx){
        while(parentIdx < this.currSize){
            let leftChildIdx = 2*parentIdx+1;
            let rightChildIdx = 2*parentIdx+2;

            //if left child doesn't exist i.e leaf nodes
            if(leftChildIdx >= this.currSize){
                return;
            }
            
            if(rightChildIdx >= this.currSize){ //no right child exist
                //if only left child exist
                if(this.heap[parentIdx] < this.heap[leftChildIdx]){
                    let temp = this.heap[parentIdx];
                    this.heap[parentIdx] = this.heap[leftChildIdx];
                    this.heap[leftChildIdx] = temp;
                }
                parentIdx = leftChildIdx;
            }else{ //right child exist
                let highestPriorityIdx = this.heap[leftChildIdx] > this.heap[rightChildIdx] ? leftChildIdx:rightChildIdx;
                if(this.heap[highestPriorityIdx] > this.heap[parentIdx]){
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
        this.upHeapify(currIdx);
        this.currSize++;
    }

    getMax(){
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
        this.downHeapify(0);
    }

    display(){
        let result = "";
        for(let i=0; i<this.currSize; i++){
            result += (this.heap[i] + " ");
        }
        console.log(result);
    }

    covertArrayToHeap(arr){
        this.heap = arr;
        this.currSize = this.heap.length;

        let n= this.heap.length-1;
        while(n>=0){
            this.downHeapify(n);
            n--;
        }
    }
}


// let myHeap = new MaxHeap();
// let arr = [11, 100, 10, 5, 25, 60, 75, 12, 14, 1];
// myHeap.covertArrayToHeap(arr);

// myHeap.display();
// console.log("size: ",myHeap.size());
// console.log("max: ", myHeap.getMax());



function KthLargestElement(arr, K){
    let myHeap = new MaxHeap();
    myHeap.covertArrayToHeap(arr);

    while(K>1){
       myHeap.pop(); 
       K--;
    }
    return myHeap.getMax();
}


let arr = [11, 100, 10, 5, 25, 60, 75, 12, 14, 1];
let K = 4;
console.log(K, "th largest element is ", KthLargestElement(arr, K));