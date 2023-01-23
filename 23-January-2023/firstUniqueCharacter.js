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




function firstUniqueCharacter(str){
    let freqArr = new Array(26);
    freqArr.fill(0);
    let q = new Queue(26);

    for(let i=0; i<str.length; i++){
        let ch = str.charAt(i);
        let idxForCh = ch.charCodeAt(0)-'a'.charCodeAt(0);
        //update the freq of char
        freqArr[idxForCh]++;
        //update the queue
        if(freqArr[idxForCh] == 1){
            q.enqueue(ch);
        }

        //check if first-unique(front of queue), is repeating now
        while(!q.isEmpty() && freqArr[q.getFront().charCodeAt(0)-'a'.charCodeAt(0)] > 1){
            q.dequeue();
        }

        //print first unique till now
        if(q.isEmpty()){
            console.log(-1);
        }else{
            console.log(q.getFront());
        }
    }
}


firstUniqueCharacter("abacacb");
