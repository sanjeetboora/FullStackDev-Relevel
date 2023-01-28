class Stack{
    constructor(size = 5){
        this.data = [];
        this.top = -1; //top index of our stack
        this.maxSize = size;
    }

    size(){
        return this.top+1;
    }

    stackOverflow(){
        return this.top >= this.maxSize-1;
    }

    stackUnderflow(){ //isEmpty
        return this.top == -1;
    }

    getTop(){
        if(this.stackUnderflow()){
            console.log("stack underflow");
            return;
        }
        return this.data[this.top];
    }

    push(val){
        if(this.stackOverflow()){
            console.log("stack overflow");
            return;
        }
        this.top++;
        this.data[this.top] = val;
    }

    pop(){
        if(this.stackUnderflow()){
            console.log("stack underflow");
            return;
        }
        this.top--;
    }

    insertElementAtBottom(value){
        if(this.stackUnderflow()){ //inserting at bottom
            this.push(value);
            return;
        }

        const topEle = this.getTop();
        this.pop();
        this.insertElementAtBottom(value);
        this.push(topEle);
    }

    reverse(){
        if(!this.stackUnderflow()){
            let topEle = this.getTop();
            this.pop();
            this.reverse();
            this.insertElementAtBottom(topEle);
        }
    }

    printStack(){
        console.log(this.data);
    }
}


class Queue{
    constructor(size = 5){
        this.data = new Stack(size);
        this.maxSize = size;
    }

    size(){
        return this.data.size();
    }

    isEmpty(){ //underflow
        return this.data.stackUnderflow();
    }

    isFull(){//overflow
        return this.data.stackOverflow();
    }

    enqueue(val){ //push
        this.data.push(val);
    }

    dequeue(){//pop
        if(this.isEmpty()){
            throw new Error("Queue Underflow");
        }
        let temp = new Stack(this.size());
        while(this.size() > 1){ //to pop topmost n-1 elements from main stack
            let topEle = this.data.getTop();
            temp.push(topEle);
            this.data.pop();
        }

        //pop from front => pop the nth element
        this.data.pop();
        while(temp.size() > 0){ //to push all elements in main stack
            let topEle = temp.getTop();
            this.data.push(topEle);
            temp.pop();
        }
    }
    getFront(){
        if(this.isEmpty()){
            throw new Error("Queue Underflow");
        }
        let temp = new Stack(this.size());
        while(this.size() > 1){ //to pop topmost n-1 elements from main stack
            let topEle = this.data.getTop();
            temp.push(topEle);
            this.data.pop();
        }

        //get from front => the nth element
        let frontEle = this.data.getTop();
        while(temp.size() > 0){ //to push all elements in main stack
            let topEle = temp.getTop();
            this.data.push(topEle);
            temp.pop();
        }
        return frontEle;
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
