class Deque{
    constructor(size = 5){
        this.data = [];
        this.front = -1;
        this.rear = -1;
        this.maxSize = size;
        this.currSize = 0;
    }

    size(){
        return this.currSize;
    }

    isEmpty(){ //underflow
        return this.currSize == 0;
    }

    isFull(){//overflow
        return this.currSize == this.maxSize;
    }

    pushBack(val){ //push
        if(this.isFull()){
            throw new Error("Queue overflow");
        }
        this.rear = (this.rear+1)%this.maxSize;
        this.data[this.rear] = val;
        if(this.isEmpty()){
            this.front = this.rear;
        }
        this.currSize++;
    }

    pushFrontUnOptimized(val){ //O(currentSize)
        if(this.isFull()){
            throw new Error("Queue overflow");
        }
        if(this.isEmpty()){
            this.pushBack(val);
            return;
        }
        this.rear = (this.rear+1)%this.maxSize;
        //shifting all the elements one place towards right
        for(let idx = this.rear; idx != this.front; idx =(idx-1)%this.maxSize){
            let valueToBeShifted = this.data[(idx-1)%this.maxSize];
            this.data[idx] = valueToBeShifted;
        }
        this.data[this.front] = val;
        this.currSize++;
    }

    pushFront(val){//O(1)
        if(this.isFull()){
            throw new Error("Queue overflow");
        }
        if(this.isEmpty()){
            this.pushBack(val);
            return;
        }
        if(this.front > 0){
            this.front--;
        }else{
           this.front = this.maxSize + (this.front-1)%this.maxSize;
        }
        this.data[this.front] = val;
        this.currSize++;
    }

    popFront(){
        if(this.isEmpty()){
            throw new Error("Queue Underflow");
        }
        this.front = (this.front+1)%this.maxSize;
        this.currSize--;
        if(this.currSize == 0){
            this.front = -1;
            this.rear = -1;
        }
    }

    popBack(){
        if(this.isEmpty()){
            throw new Error("Queue Underflow");
        }
        this.rear = (this.rear-1)%this.maxSize;
        this.currSize--;
        if(this.currSize == 0){
            this.front = -1;
            this.rear = -1;
        }
    }

    getFront(){
        if(this.isEmpty()){
            throw new Error("Queue Underflow");
        }
        return this.data[this.front];
    }

    getRear(){
        if(this.isEmpty()){
            throw new Error("Queue Underflow");
        }
        return this.data[this.rear];
    }
}


function slidingWindowMaximum(arr, K){
    let dq = new Deque(K);
    //first window
    let start = 0;
    let end = K-1
    for( let i = start; i<= end; i++){
        //pop out the smaller elements from deque from rear end
        while(!dq.isEmpty() && arr[dq.getRear()] < arr[i]){
            dq.popBack();
        }
        dq.pushBack(i);
    }
    start++;
    end++;
    //for rest of the windows
    while(end < arr.length){
        //print max of last window
        console.log(arr[dq.getFront()]);
        
        //pop out the elements of earlier window
        while(!dq.isEmpty() && dq.getFront() < start){
            dq.popFront();
        }

        //pop out the smaller elements from deque from rear end
        while(!dq.isEmpty() && arr[dq.getRear()] < arr[end]){
            dq.popBack();
        }

        //push the current element in queue
        dq.pushBack(end);
        start++;
        end++;
    }

    console.log(arr[dq.getFront()]);
}


let arr =[1, 3, -1,-3, 5, 3, 6, 7];
slidingWindowMaximum(arr, 3);