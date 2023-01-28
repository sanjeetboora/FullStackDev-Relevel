class Stack{
    constructor(size = 5){
        this.data = [];
        this.top = -1; //top index of our stack
        this.maxSize = size;
        this.minElement = Math.Infinite;
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
        if(this.data[this.top] >= this.minElement){
            return this.data[this.top];
        }
        else{
            return this.minElement;
        }
    }

    push(val){
        if(this.stackOverflow()){
            console.log("stack overflow");
            return;
        }
        this.top++;
        if(val >= this.minElement){
            this.data[this.top] = val;
        }
        else{ //encoding
            let modifiedEle = 2 * val - this.minElement;
            this.data[this.top] = modifiedEle;
            this.minElement = val;
        }
    }

    pop(){
        if(this.stackUnderflow()){
            console.log("stack underflow");
            return;
        }

        if(this.data[this.top] < this.minElement){ //update minEle
            let prevMin = 2*this.minElement - this.data[this.top];
            this.minElement = prevMin;
        }
        this.top--;
    }
    
    getMin(){
        if(this.stackUnderflow()){
            console.log("stack underflow");
            return;
        }
        return this.minElement;
    }
}


let myStack = new Stack();
console.log("top: ",myStack.getTop());
console.log("minEle: ",myStack.getMin());
myStack.push(20);
console.log("top: ",myStack.getTop());
console.log("minEle: ",myStack.getMin());
myStack.push(30);
console.log("top: ",myStack.getTop());
console.log("minEle: ",myStack.getMin());
myStack.push(10);
console.log("top: ",myStack.getTop());
console.log("minEle: ",myStack.getMin());
myStack.push(7);
console.log("top: ",myStack.getTop());
console.log("minEle: ",myStack.getMin());
myStack.push(8);
console.log("top: ",myStack.getTop());
console.log("minEle: ",myStack.getMin());
myStack.pop();
console.log("top: ",myStack.getTop());
console.log("minEle: ",myStack.getMin());
myStack.pop();
console.log("top: ",myStack.getTop());
console.log("minEle: ",myStack.getMin());
myStack.pop();
console.log("top: ",myStack.getTop());
console.log("minEle: ",myStack.getMin());
myStack.pop();
console.log("top: ",myStack.getTop());
console.log("minEle: ",myStack.getMin());
myStack.pop();
console.log("top: ",myStack.getTop());
console.log("minEle: ",myStack.getMin());
myStack.pop();



