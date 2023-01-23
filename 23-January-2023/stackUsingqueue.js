class Queue{
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

    enqueue(val){ //push
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

    dequeue(){//pop
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
    getFront(){
        if(this.isEmpty()){
            throw new Error("Queue Underflow");
        }
        return this.data[this.front];
    }

    printQueue(){
        let i=this.front;
        while(i<this.rear){
            console.log(this.data[i]);
            i = (this.front+1)%this.maxSize;
        }
    }
}
class Stack{
    constructor(size = 5){
        this.maxSize = size;
        this.data = new Queue(this.maxSize);
    }

    size(){
        return this.data.size();
    }

    stackOverflow(){
        return this.data.size() == this.maxSize;
    }

    stackUnderflow(){ //isEmpty
        return this.data.size() == 0;
    }

    getTop(){//O(N)
        if(this.stackUnderflow()){
            console.log("stack underflow");
            return;
        }
        if(this.data.size() == 1){
            return this.data.getFront();
        }

        let tempQueue = new Queue(this.data.size());
        let topEle = -1;
        //push the elements from main queue to temp queue
        while(this.data.size() > 1){
            tempQueue.enqueue(this.data.getFront());
            this.data.dequeue();
        }
        //get the top element
        topEle = this.data.getFront();
        tempQueue.enqueue(this.data.getFront());
        this.data.dequeue();

        //push all the elements back into main queue from temp queue        
        while(tempQueue.size() > 0){
            this.data.enqueue(tempQueue.getFront());
            tempQueue.dequeue();
        }
        return topEle;
    }

    push(val){
        if(this.stackOverflow()){
            console.log("stack overflow");
            return;
        }
        this.data.enqueue(val);
    }

    pop(){ //O(N)
        if(this.stackUnderflow()){
            console.log("stack underflow");
            return;
        }

        let tempQueue = new Queue(this.data.size());
        //push the elements from main queue to temp queue
        while(this.data.size() > 1){
            tempQueue.enqueue(this.data.getFront());
            this.data.dequeue();
        }
        //pop the top element
        this.data.dequeue();

        //push all the elements back into main queue from temp queue        
        while(tempQueue.size() > 0){
            this.data.enqueue(tempQueue.getFront());
            tempQueue.dequeue();
        }
    }
    
    printStack(){
        console.log(this.data.printQueue());
    }
}


let myStack = new Stack();
console.log("top: ",myStack.getTop());
console.log("size: ", myStack.size());
myStack.push(10);
console.log("top: ",myStack.getTop());
console.log("size: ", myStack.size());
myStack.push(20);
console.log("top: ",myStack.getTop());
console.log("size: ", myStack.size());
myStack.push(80);
myStack.push(70);
myStack.pop();
console.log("top: ",myStack.getTop());
console.log("size: ", myStack.size());
myStack.pop();
console.log("top: ",myStack.getTop());
console.log("size: ", myStack.size());
myStack.pop();






