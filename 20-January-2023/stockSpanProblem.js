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




function stockSpan(stockPrice){
    const st = new Stack(stockPrice.length);
    const output = new Array(stockPrice.length);
    for(let currDay=0; currDay<stockPrice.length; currDay++){
        while(!st.stackUnderflow() && stockPrice[st.getTop()] <= stockPrice[currDay]){
            st.pop();
        }
        if(st.stackUnderflow()){
            output[currDay]=(currDay - (-1));
        }else{
            output[currDay]=(currDay - st.getTop());
        }
        st.push(currDay);
    }
    return output;
}


let arr = [100, 80, 60, 70, 60, 75, 85];
console.log(stockSpan(arr));