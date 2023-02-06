class Node{
    constructor(data){
        this.data = data;
        this.left = null;
        this.right = null;
    }
}

function buildTree(preOrder, inOrder){
    return buildTreeHelper(preOrder, 0, preOrder.length-1, inOrder, 0, inOrder.length-1);
}

function buildTreeHelper(preOrder, preStart, preEnd, inOrder, inStart, inEnd){
    //base case
    if(preStart > preEnd || inStart > inEnd){
        return null;
    }
    //self work
    let currNode = new Node(preOrder[preStart]);
    let idxInInorder = -1;
    for(let i = inStart; i <= inEnd; i++){
        if(currNode.data == inOrder[i]){
            idxInInorder = i;
            break;
        }
    }
    let noOfNodesInLeftSubtree = idxInInorder - inStart;
    
    //recursive calls
    currNode.left = buildTreeHelper(preOrder, preStart+1, preStart +noOfNodesInLeftSubtree,inOrder, inStart, idxInInorder-1);
    currNode.right = buildTreeHelper(preOrder, preStart +noOfNodesInLeftSubtree + 1, preEnd, inOrder, idxInInorder+1, inEnd);
    
    return currNode;
}


let preOrder = [3, 9, 20, 15, 7];
let inOrder = [9, 3, 15, 20, 7];
let binaryTree = buildTree(preOrder, inOrder);

function preOrderTraversal(node){
    //base case
    if(node == null){
        return;
    }

    //self work
    console.log(node.data);

    //recursive calls
    preOrderTraversal(node.left);
    preOrderTraversal(node.right);
}
console.log("=====preOrderTraversal==========")
preOrderTraversal(binaryTree);


function inOrderTraversal(node){
    //base case
    if(node == null){
        return;
    }

    //recursive calls
    inOrderTraversal(node.left);
    console.log(node.data);//self work
    inOrderTraversal(node.right);
}
console.log("=====inOrderTraversal==========")
inOrderTraversal(binaryTree);


function postOrderTraversal(node){
    //base case
    if(node == null){
        return;
    }

     //recursive calls
     postOrderTraversal(node.left);
     postOrderTraversal(node.right);
     console.log(node.data);//self work
}
console.log("=====postOrderTraversal==========")
postOrderTraversal(binaryTree);



function findLCA(node, P, Q){
    if(node == null){
        return null;
    }

    //one of your nodes is the ancestor of another
    if(node.data == P || node.data == Q){
        return node;
    }

    let leftSubTree = findLCA(node.left, P, Q);
    let rightSubTree = findLCA(node.right, P, Q);

    //one node exists in left subtree and another node exists in right subtree
    if(leftSubTree != null && rightSubTree != null){
        return node;
    }

    //when both nodes exists in one of the subtrees
    if(leftSubTree != null){
        return leftSubTree
    }else{
        return rightSubTree
    }
}

let lcaResult = findLCA(binaryTree, 9, 3);
console.log("lcaResult ", lcaResult);


let solution = 0;
function distanceBetweenNode(node, A, B){
    if(node == null){
        return 0;
    }

    let leftDistance = distanceBetweenNode(node.left, A, B);
    let rightDistance = distanceBetweenNode(node.right, A, B);

    if(node.data == A || node.data == B){ //when one node is found as current node
        if(leftDistance || rightDistance){
            solution = Math.max(leftDistance, rightDistance);
            return 0;
        }
        return 1;
    }
    else if(leftDistance && rightDistance){//one node exist in left subtree and another node in right subtree
        ans = leftDistance + rightDistance;
        return 0;
    }else if(leftDistance || rightDistance){//when current node is ancestor of another node.
        return Math.max(leftDistance, rightDistance)+1;
    }
    return 0;
}
distance(distanceBetweenNode, 3, 15);
console.log(solution);










