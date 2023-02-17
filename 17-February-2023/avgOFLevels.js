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

class Node{
    constructor(val){
        this.data = val;
        this.left = null;
        this.right = null;
    }
}

let myBinaryTree  = new Node(10);
myBinaryTree.left = new Node(20);
myBinaryTree.right = new Node(30);
myBinaryTree.left.right = new Node(40);


/**
 *              10
 *            /    \
 *          20      30
 *        /   \    /   \
 *     null   40  null  null
 *           /  \ 
 *         null null
 * 
 */


function AverageOfLevels(node){
    let q = new Queue();
    q.enqueue(node);
    q.enqueue('\n');
    let tempArr =[];
    while(!q.isEmpty()){
        let frontNode = q.getFront();
        q.dequeue();
        if(frontNode == '\n' && !q.isEmpty()){ //special char to denote level ended
            console.log("=====");
            let sum = 0;
            for(let i =0; i<tempArr.length; i++){
                sum += tempArr[i].data;
            }
            console.log(tempArr, " => avg : ", sum/tempArr.length);
            console.log("=====");
            tempArr = [];
            q.enqueue('\n');   
        }
        else{ //normal node
            console.log(frontNode.data);
            tempArr.push(frontNode);
            frontNode.left != null && q.enqueue(frontNode.left);
            //another way to write it
            // if(frontNode.left != null){ 
            //     q.enqueue(frontNode.left)
            // }
            frontNode.right!=null && q.enqueue(frontNode.right);
        
        }
    }

    //for last level
    let sum = 0;
    for(let i =0; i<tempArr.length-1; i++){
        sum += tempArr[i].data;
    }
    console.lo
    console.log(tempArr, " => avg : ", sum/tempArr.length);
    console.log("=====");
}

AverageOfLevels(myBinaryTree);


