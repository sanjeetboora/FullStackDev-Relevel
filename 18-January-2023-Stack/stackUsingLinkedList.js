class Node{
    constructor(value){
        this.value = value;
        this.next = null;
    }
}

class Stack{
    constructor(size = 5){
        this.top = null; //top in stack is acting as head in linked list
        this.length = 0;
        this.maxSize = size;
    }

    stackOverflow(){
        return this.length >= this.maxSize;
    }

    stackUnderflow(){  //isEmpty
        return this.length == 0;
    }

    getTop(){
        if(this.stackUnderflow()){
            console.log("stack underflow");
            return;
        }
        return this.top.value;
    }

    push(val){
        if(this.stackOverflow()){
            console.log("stack overflow");
            return;
        }
        let newNode = new Node(val);
        newNode.next = this.top;
        this.top = newNode;
        this.length++;
    }

    pop(){
        if(this.stackUnderflow()){
            console.log("stack underflow");
            return;
        }
        let nodeToBeDeleted = this.top;
        this.top = this.top.next;
        nodeToBeDeleted = null;
        this.length--;
    }
}


let myStack = new Stack();
console.log(myStack.getTop());
myStack.push(10);
console.log(myStack.getTop());
myStack.push(20);
console.log(myStack.getTop());
myStack.pop();
console.log(myStack.getTop());
myStack.pop();
console.log(myStack.getTop());
myStack.pop();
