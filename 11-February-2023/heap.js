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


let myHeap = new MaxHeap();
myHeap.insert(10);
console.log("size: ", myHeap.size());
console.log("getMax: ", myHeap.getMax());
myHeap.display();
myHeap.insert(20);
console.log("size: ", myHeap.size());
console.log("getMax: ", myHeap.getMax());
myHeap.display();
myHeap.insert(5);
console.log("size: ", myHeap.size());
console.log("getMax: ", myHeap.getMax());
myHeap.display();
myHeap.insert(40);
console.log("size: ", myHeap.size());
console.log("getMax: ", myHeap.getMax());
myHeap.display();
myHeap.pop();
console.log("size: ", myHeap.size());
console.log("getMax: ", myHeap.getMax());
myHeap.display();
myHeap.pop();
console.log("size: ", myHeap.size());
console.log("getMax: ", myHeap.getMax());
myHeap.display();
myHeap.pop();
console.log("size: ", myHeap.size());
console.log("getMax: ", myHeap.getMax());
myHeap.display();
