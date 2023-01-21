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
}

let q = new Queue(3);
console.log(q.isEmpty());
console.log("size: ",q.size());
q.enqueue(10);
console.log(q.isEmpty());
console.log("size: ",q.size());
console.log("front: ", q.getFront());
q.enqueue(20);
console.log("size: ",q.size());
console.log("front: ", q.getFront());
q.enqueue(30);
console.log("size: ",q.size());
console.log("front: ", q.getFront());
// q.enqueue(40);
q.dequeue();
console.log("size: ",q.size());
console.log("front: ", q.getFront());
q.dequeue();
console.log("size: ",q.size());
console.log("front: ", q.getFront());
q.dequeue();
console.log("size: ",q.size());
console.log("front: ", q.getFront());


