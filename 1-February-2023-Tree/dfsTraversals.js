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

// preOrderTraversal(myBinaryTree);



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
// inOrderTraversal(myBinaryTree);


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
postOrderTraversal(myBinaryTree);
