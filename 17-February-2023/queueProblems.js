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


function arrayPermutaion(qInput, qOutput){
    let st = new Stack(qInput.size());
while((!st.stackUnderflow() || !qInput.isEmpty())){
        let outputFront = qOutput.getFront();

        if(!st.stackUnderflow() && outputFront == st.getTop()){
            qOutput.dequeue();
            st.pop();
        }else if(!qInput.isEmpty() && outputFront == qInput.getFront()){
            qOutput.dequeue();
            qInput.dequeue();
        }else{
            if(qInput.isEmpty()){
                break;
            }
            st.push(qInput.getFront());
            qInput.dequeue();  
        }
    }
    return qInput.size() == 0 && st.size() == 0;
}

let q1 = new Queue();
q1.enqueue(4);
q1.enqueue(6);
q1.enqueue(5);
// q1.enqueue(1);
// q1.enqueue(2);
// q1.enqueue(3);
// q1.enqueue(4);
let q2 = new Queue();
q2.enqueue(6);
q2.enqueue(5);
q2.enqueue(4);
// q2.enqueue(3);
// q2.enqueue(1);
// q2.enqueue(2);
// q2.enqueue(4);
// console.log(arrayPermutaion(q1, q2));


function iceCreamPurchase(currencyQueue){
    let notesFreq = new Map();
    let i = 0;
    while(i < currencyQueue.length){
        let currNote = currencyQueue[i++];
        let changeNeeded = currNote - 5;
        
        if(changeNeeded == 5 ){
            if(notesFreq[5] > 0){
                notesFreq[5]--;
            }else{//don't have enough change
                return false;
            }
        }else if(changeNeeded == 10){
            if(notesFreq[10] > 0){
                notesFreq[10]--;
            }else if(notesFreq[5] > 1){
                notesFreq[5] -=2;
            }else{ //don't have enough change
                return false;
            }
        }else if(changeNeeded==15){ //changeNeeded==15
            if(notesFreq[10] > 0 && notesFreq[5] > 0){
                notesFreq[10]--;
                notesFreq[5]--;
            }else if(notesFreq[5] >= 3){
                notesFreq[5] -= 3;
            }else{ //don't have enough change
                return false;
            }
        }
        notesFreq[currNote] = (notesFreq[currNote] || 0)+1;
    }
    return true;
}

// let currencyArr = [5, 5, 10, 20];
// console.log(iceCreamPurchase(currencyArr));



class PetrolPump{
    constructor(petrol, distance){
        this.petrol = petrol;
        this.distance = distance;
    }
}

function startTravelling(arr){
    let start =0;
    let end = 1;
    let currPetrol = arr[start].petrol - arr[start].distance;

    while(start != end || currPetrol < 0){
        while(currPetrol < 0 && start != end){
            currPetrol = arr[start].petrol - arr[start].distance;

            start = (start+1)%arr.length;
            if(start == 0){
                return -1;
            }
        }

        currPetrol += arr[end].petrol - arr[end].distance;
        end = (end+1)%arr.length;
    }
    return start;
}

let arr = [new PetrolPump(4, 6),new PetrolPump(6, 5),new PetrolPump(7, 3),new PetrolPump(4, 5) ];
let startPosition = startTravelling(arr);
if(startPosition == -1){
    console.log("no solution exists");
}
else{
    console.log("start position", startPosition);
}




