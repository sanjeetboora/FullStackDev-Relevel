class Node{
    constructor(val){
        this.data = val;
        this.left = null;
        this.right = null;
    }
}


let myBinaryTree  = new Node(10);
myBinaryTree.left = new Node(20);
myBinaryTree.right = new Node(20);
myBinaryTree.left.right = new Node(40);
myBinaryTree.right.left = new Node(40);


/**
 *              10
 *            /    \
 *          20      20
 *        /   \    /   \
 *     null   40  40  null
 *          /  \ /  \
 *     null null null null
 * 
 */


function find(node, key){
    //base case
    if(node == null){
        return false;
    }

    //self work
    if(node.data==key){
        return true;
    }

    //recursive calls
    let leftResult = find(node.left, key);
    let rightResult = find(node.right, key);
    return leftResult || rightResult;
}

// const ans = find(myBinaryTree, 60);
// console.log(ans);



function heightOfTree(node){
    if(node == null){
        return -1;
    }

    let leftHeight = heightOfTree(node.left);
    let rightHeight = heightOfTree(node.right);
    
    let height = 1 + Math.max(leftHeight, rightHeight);
    return height;
}

// console.log(heightOfTree(myBinaryTree));



function isMirrorHelper(nodeLeft, nodeRight){
    if(nodeLeft == null && nodeRight == null){
        return true;
    }

    if(nodeLeft == null || nodeRight == null){
        return false;
    }

    let result = false;
    if(nodeLeft.data == nodeRight.data){
        result = isMirrorHelper(nodeLeft.left, nodeRight.right) 
        && isMirrorHelper(nodeLeft.right, nodeRight.left);
    } 
    return result;
}


function isMirror(node){
    return isMirrorHelper(node, node);
}

console.log(isMirror(myBinaryTree));