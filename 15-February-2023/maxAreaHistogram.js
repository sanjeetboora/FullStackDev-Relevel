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
        for(let i=0; i<=this.top; i++){
            console.log(this.data[i], ", ");
        }
    }
}

function maxRectangularAreaInHistogram(histogramArr){
    let st = new Stack(histogramArr.length);
    let maxArea = 0;
    let i=0;
    while(i<histogramArr.length){
        if(st.stackUnderflow() || histogramArr[i] >= histogramArr[st.getTop()]){
            st.push(i);
            i++;
        }
        else{
            let poppedIndex  = st.getTop();
            st.pop();
            let area = histogramArr[poppedIndex] * (st.stackUnderflow() ? i : i-st.getTop()-1);
            console.log("contribution of ", poppedIndex, " index is ", area);
            maxArea = Math.max(area, maxArea);
        }

    }
    while(!st.stackUnderflow()){
        let top  = st.getTop();
        st.pop();

        let area = histogramArr[top] * (st.stackUnderflow() ? i : i-st.getTop()-1);
        console.log("contribution of ", top, " index is ", area);
        maxArea = Math.max(area, maxArea);
    }
    return maxArea;
}


let histogramArr =[6,2,5,4,5,1,6];
 //[2, 5, 3, 1, 4, 0, 3];
console.log(maxRectangularAreaInHistogram(histogramArr));