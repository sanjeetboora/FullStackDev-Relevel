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




function nextGreaterElement(arr){
    const st = new Stack(arr.length);
    const output = new Array(arr.length);
    for(let i=0; i<arr.length; i++){
        while( !st.stackUnderflow() && arr[i] > arr[st.getTop()]){
            output[st.getTop()] = arr[i];
            st.pop();
        }
        st.push(i);
    }
    while(!st.stackUnderflow()){
        output[st.getTop()] = -1;
        st.pop();
    }
    return output;
}


let arr = [2, 5, 3, 3, 9, 3, 7, 11];
console.log(nextGreaterElement(arr));