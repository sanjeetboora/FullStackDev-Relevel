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

class Node{
    constructor(val){
        this.data = val;
        this.left = null;
        this.right = null;
    }
}

function insertInBST(node, data){
    //base case
    if(node == null){
        node = new Node(data);
        return node;
    }

    if(data < node.data){
        node.left = insertInBST(node.left,data);//on left
    }else{
        node.right = insertInBST(node.right,data);//on right
    }
    return node;
}

function greatestNodeInBST(node){
    while(node.right != null){
        node = node.right;
    }
    return node;
}


function deleteInBST(node, dataToBeDeleted){
    if(node == null){
        return;
    }

    if(dataToBeDeleted < node.data){
        node.left = deleteInBST(node.left, dataToBeDeleted);
    }
    else if(dataToBeDeleted > node.data){
        node.right = deleteInBST(node.right, dataToBeDeleted);
    }else{//node to be deleted found
        //case1 : node to be deleted is leaf node
        if(node.left==null && node.right == null){
            node = null;
        }
        //case 2 : node to be deleted has two children
        else if(node.left && node.right){
            let greatestNodeInLeftSubtree = greatestNodeInBST(node.left);
            node.data = greatestNodeInLeftSubtree.data;
            node.left = deleteInBST(node.left, node.data);
        }
        //case 3 : node to be deleted has single child
        else{
            node = node.left || node.right;
        }
    }
    return node;
}


// let bstRoot = insertInBST(null, 30);
// insertInBST(bstRoot, 10);
// insertInBST(bstRoot, 100);
// insertInBST(bstRoot, 20);
// insertInBST(bstRoot, 70);
// insertInBST(bstRoot, 5);
// inOrderTraversal(bstRoot);
// console.log("=====================");
// deleteInBST(bstRoot, 5);
// deleteInBST(bstRoot, 10);
// deleteInBST(bstRoot, 100);
// inOrderTraversal(bstRoot);





let bstRoot = insertInBST(null, 8);
let ele = [3, 11, 1, 5, 0, 4, 9, 12, 10, 7, 6]
for(let i =0; i<ele.length;i++){
    insertInBST(bstRoot, ele[i]);
}
inOrderTraversal(bstRoot);
console.log("=====================");
bstRoot = deleteInBST(bstRoot, 7);
inOrderTraversal(bstRoot);
console.log("=====================");