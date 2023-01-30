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