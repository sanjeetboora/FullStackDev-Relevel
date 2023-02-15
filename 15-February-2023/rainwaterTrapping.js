function rainwaterTrapping1(height){ //TC: 4N , SC: 3N
    let leftMax =[];
    let rightMax = [];
    let waterTrapped = [];
    let maxHeight = 0;
    for(let i=0; i<height.length; i++){
        maxHeight = Math.max(height[i], maxHeight);
        leftMax[i]=maxHeight;
    }
    maxHeight = 0;
    for(let i=height.length-1; i>=0; i--){
        maxHeight = Math.max(height[i], maxHeight);
        rightMax[i]=maxHeight;
    }

    for(let i=0; i<height.length; i++){
        let waterTrappedAtCurrentWall = Math.min(leftMax[i], rightMax[i]) - height[i];
        waterTrapped[i] = waterTrappedAtCurrentWall;
    }

    let totalWaterTrapped = 0
    for(let i=0; i<height.length; i++){
        totalWaterTrapped += waterTrapped[i];
    }
    return totalWaterTrapped;
}

// let height = [0,1,0,2,1,0,1,3,2,1,2,1];
// console.log(rainwaterTrapping1(height));



function rainwaterTrapping2(height){ //TC: 3N , SC: 2N
    let leftMax =[];
    let rightMax = [];
    let maxHeight = 0;
    for(let i=0; i<height.length; i++){
        maxHeight = Math.max(height[i], maxHeight);
        leftMax[i]=maxHeight;
    }
    maxHeight = 0;
    for(let i=height.length-1; i>=0; i--){
        maxHeight = Math.max(height[i], maxHeight);
        rightMax[i]=maxHeight;
    }
    let totalWaterTrapped = 0
    for(let i=0; i<height.length; i++){
        let waterTrappedAtCurrentWall = Math.min(leftMax[i], rightMax[i]) - height[i];
        totalWaterTrapped += waterTrappedAtCurrentWall;
    }
    return totalWaterTrapped;
}

// let height = [0,1,0,2,1,0,1,3,2,1,2,1];
// console.log(rainwaterTrapping2(height));



function rainwaterTrapping3(height){ //TC: 3N , SC: 1N
    let minHeight =[];
    let maxHeight = 0;
    for(let i=0; i<height.length; i++){
        maxHeight = Math.max(height[i], maxHeight);
        minHeight[i]=maxHeight;
    }
    maxHeight = 0;
    for(let i=height.length-1; i>=0; i--){
        maxHeight = Math.max(height[i], maxHeight);

        minHeight[i] = Math.min(minHeight[i], maxHeight);
    }
    let totalWaterTrapped = 0
    for(let i=0; i<height.length; i++){
        let waterTrappedAtCurrentWall = minHeight[i] - height[i];
        totalWaterTrapped += waterTrappedAtCurrentWall;
    }
    return totalWaterTrapped;
}

// let height = [0,1,0,2,1,0,1,3,2,1,2,1];
// console.log(rainwaterTrapping3(height));


function rainwaterTrapping4(height){ //TC: 2N , SC: 1N
    let minHeight =[];
    let maxHeight = 0;
    for(let i=0; i<height.length; i++){
        maxHeight = Math.max(height[i], maxHeight);
        minHeight[i]=maxHeight;
    }
    maxHeight = 0;
    let totalWaterTrapped = 0
    for(let i=height.length-1; i>=0; i--){
        maxHeight = Math.max(height[i], maxHeight);
        minHeight[i] = Math.min(minHeight[i], maxHeight);
        
        let waterTrappedAtCurrentWall = minHeight[i] - height[i];
        totalWaterTrapped += waterTrappedAtCurrentWall;
    }
    return totalWaterTrapped;
}

// let height = [0,1,0,2,1,0,1,3,2,1,2,1];
// console.log(rainwaterTrapping4(height));

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
function rainwaterTrappingUsingStack(height){ //TC: 2N , SC: 1N
    let st = new Stack(height.length);
    let waterTrapped = 0;
    for(let i=0; i<height.length; i++){
        while(!st.stackUnderflow() && height[st.getTop()] < height[i]){
            let poppedHeight = height[st.getTop()];
            st.pop();

            if(st.stackUnderflow()){
                break;
            }

            let distance = i-st.getTop()-1;
            let _height = Math.min(height[i], height[st.getTop()]) - poppedHeight;
            waterTrapped += distance* _height;
        }
        st.push(i);
    }
    return waterTrapped;
}

let height = [0,1,0,2,1,0,1,3,2,1,2,1];
console.log(rainwaterTrappingUsingStack(height));