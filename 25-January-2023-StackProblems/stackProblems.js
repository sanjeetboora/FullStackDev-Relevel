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


function minimumDeletion(str){
    let st = new Stack(str.length);
    let count =0;
    for(let i = str.length-1; i>= 0; i--){
        if(!st.stackUnderflow() && st.getTop() == 'a' && str[i] == 'b'){
            st.pop();
            count++;
        }
        st.push(str[i]);
    }
    return count;
}

// const result = minimumDeletion("aababbab");
// console.log(result);


//======================================================


function findMinimumInteger(str, K){
    let st = new Stack(str.length);

    for(let ch of str){
        while(!st.stackUnderflow() && K > 0 && st.getTop().charCodeAt(0) > ch.charCodeAt(0)){
            st.pop();
            K--;
        }
        st.push(ch);
    }

    while(!st.stackUnderflow() && K > 0 ){
        st.pop();
        K--;
    }

    if(st.stackUnderflow()){
        return 0;
    }

    let result = "";
    while(!st.stackUnderflow()){
      result = st.getTop()+ result;
      st.pop();
    }
    return result;
}

// const res = findMinimumInteger("10300", 1);
// console.log(res);

function frogJumpMaxStamina(height){
    let st = new Stack(height.length); // storing the index of height of the building
    let stamina = height;
    for(let i=height.length-1; i>= 0; i--){
        while(!st.stackUnderflow() && height[st.getTop()] < height[i]){
            st.pop();
        }
        if(!st.stackUnderflow()){
            stamina[i] = height[i] ^ stamina[st.getTop()];
        }
        st.push(i);
        // st.printStack();
        // console.log(stamina);
        // console.log("===================");
    }
    return Math.max(...stamina);
}

// let height = [1, 2, 4, 9, 5];
// let result = frogJumpMaxStamina(height);
// console.log(result);


function evaluatePostfixExpressions(str){
    let operators = ['*', '/', "+", "-"];
    let st = new Stack(str.length);
    for (char of str){
        if(operators.indexOf(char) > -1){
            let b = st.getTop();
            st.pop();
            let a = st.getTop();
            st.pop();
            let res = 0;
            switch(char){
                case "*":
                    res = a*b;
                    break;
                case "/":
                    res = a/b;
                    break;
                case "+":
                    res = a+b;
                    break;
                case "-":
                    res = a-b;
                    break;
            }
            st.push(res);
        }else{
            st.push(Number(char));
        }
    }
    return st.getTop();
}

const res = evaluatePostfixExpressions("6784/+-");
console.log(res);