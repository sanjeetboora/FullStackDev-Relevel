class Stack{
    constructor(size = 5){
        this.data = [];
        this.top = -1; //top index of our stack
        this.maxSize = size;
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


let myStack = new Stack();
// console.log(myStack.getTop());
// myStack.push(10);
// console.log(myStack.getTop());
// myStack.push(20);
// console.log(myStack.getTop());
// myStack.push(80);
// myStack.push(70);
// myStack.pop();
// console.log(myStack.getTop());
// myStack.pop();
// console.log(myStack.getTop());
// myStack.pop();
// myStack.insertElementAtBottom(40);
// myStack.printStack();
// myStack.reverse();
// myStack.printStack();







/////////////////////////////
function isOpening(bracket){
    const opening = ['[', '{', '('];
    return opening.indexOf(bracket) > -1;
}

function isClosing(bracket){
    const closing = [']', '}', ')'];
    return closing.indexOf(bracket) > -1;
}

const matchingBrackets = {
    '}' : '{',
    ')' :'(',
    ']' : '['
}

function checkBrackets(inputString){
    const st = new Stack(inputString.length/2);

    for(const bracket of inputString){
        if(isOpening(bracket)){
            st.push(bracket);
        }else if(isClosing(bracket)){
            const correctOpeningBracket = matchingBrackets[bracket];
            const lastOpeningBracket = st.getTop();
            st.pop();
            if(correctOpeningBracket !== lastOpeningBracket){
                return false;
            }
        }
    }
    return st.stackUnderflow();
}

const str = "{[()(]{}]}"
console.log(checkBrackets(str));