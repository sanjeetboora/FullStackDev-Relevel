// Node class
class Node{
    constructor(data){
        this.data = data;
        this.next = null;
    }
}

//Singly Linked List class
class SinglyLinkedList{
    constructor(){
        this.head = null;
        this.length = 0;
    }

    insertAtHead(data){
        let newNode = new Node(data); //Create new node
        newNode.next = this.head; //point newNode's next at head
        this.head = newNode;//Update head to new node
        this.length++;
    }

    insertAtTail(data){
        //when linkedList is empty
        if(this.head == null){
            this.insertAtHead(data);
            return;
        }

        //create the new node
        let newNode = new Node(data);

        //find the last node;
        let curr = this.head;
        while(curr.next != null){
            curr = curr.next;
        }
        //update last node's next to null
        curr.next = newNode;
        this.length++;
    }

    insertAtGivenPosition(data, pos){
        if(pos < 0 ||pos > this.length){
            console.log("position out of bound of current linked list");
            return;
        }
        else if(pos == 0){ //insert at head
            this.insertAtHead(data);
            return;
        }
        else if(pos == this.length){//insert at tail
            this.insertAtTail(data);
            return;
        }

         //create the new node
        let newNode = new Node(data);
        //find element at given poistion
        let count = 1;
        let currNode = this.head;
        while(count < pos){
            count++;
            currNode = currNode.next;
        }

        //insert new node at given position
        newNode.next = currNode.next;
        currNode.next=newNode;
        this.length++;
    }


    deleteAtHead(){
        if(!this.head){
            console.log("No elements are present in the linkedlist");
            return;
        }
        let curr = this.head;
        this.head = this.head.next;
        curr = null;
        this.length--;
    }

    deleteAtTail(){
        //when no node in ll or only one node in ll 
        if(!this.head || !this.head.next){
            this.deleteAtHead();
            return;
        }
        
        let curr = this.head;
        while(curr.next.next){
            curr = curr.next;
        }
        curr.next = null;
        this.length--;
    }
    //assuming position starts from 1
    deleteAtGivenPosition(position){
        //invalid position
        if(position < 1 || position > this.length){
            console.log("given position is invalid");
            return;
        }
        //deletion at head
        if(position == 1){
            this.deleteAtHead();
            return;
        }
        // deletion at tail
        if(position == this.length){
            this.deleteAtTail();
            return;
        }
        let count = 1;
        let curr = this.head;
        while(count < position-1){
            count++;
            curr = curr.next;
        }

        let nodeToBeDeleted = curr.next;
        curr.next = curr.next.next;
        nodeToBeDeleted = null;
        this.length--;
    }

    printLinkedList(){
        let current = this.head;
        while(current != null){
            console.log(current);
            current = current.next;//move to next node 
        }
    }

    printLinkedListData(){
        let result = "";
        let current = this.head;
        while(current != null){
            result += (current.data + ", ");
            current = current.next;//move to next node 
        }
        console.log(result);
    }
}


// to reverse a linked list

function reverseLinkedList(head){
    let curr = head;
    let prev = null;
    while(curr != null){
        let nextNode = curr.next;
        //reverse the pointer
        curr.next = prev;

        //update the pointers
        prev = curr;
        curr = nextNode;        
    }
    return prev; //return new head of linked list
}

// let ll = new SinglyLinkedList();
// ll.insertAtHead(10);
// ll.insertAtHead(20);
// ll.insertAtTail(30);
// ll.insertAtGivenPosition(50, 0);
// ll.insertAtGivenPosition(100, 4);
// ll.insertAtGivenPosition(70, 3);
// ll.printLinkedListData();

// ll.head = reverseLinkedList(ll.head);
// ll.printLinkedListData();



// return middle node of the given linked list
function getMid(head){
    let slow = head;
    let fast = head;

    while(fast!=null && fast.next!= null){
        slow = slow.next;
        fast = fast.next.next;
    }
    return slow;
}

// merge 2 given linked lists
function mergeLinkedList(X, Y){
    let result = new Node(0);
    let temp = result;
    while(X!=null && Y != null){
        temp.next = X;
        X = X.next;

        temp.next.next = Y;
        Y = Y.next;

        temp = temp.next.next;
    }

    if(X == null){
        temp.next = Y;
    }else if(Y == null){
        temp.next = X;
    }

    return result.next;
}

//reorder/folding of linked list
function reorder(head){
    //get mid of linked list
    let mid = getMid(head);

    //divide linked list in 2 parts using mid
    let A = head;
    let B = mid.next;
    mid.next = null; //detach the linkedlist after mid

    let reversedB = reverseLinkedList(B);

    let result = mergeLinkedList(A, reversedB);
    return result;
}

// let ll = new SinglyLinkedList();
// ll.insertAtHead(10);
// ll.insertAtHead(20);
// ll.insertAtTail(30);
// ll.insertAtGivenPosition(50, 0);
// ll.insertAtGivenPosition(100, 4);
// ll.insertAtGivenPosition(70, 3);
// ll.printLinkedListData();

// ll.head = reorder(ll.head);
// ll.printLinkedListData();

//to detect if cycle exists in given linked list or not
function cycleDetection(head){
    let slow = head;
    let fast = head.next;

    while(slow != fast){
        if(fast == null || fast.next == null){
            return false; //no cycle
        }
        slow = slow.next;
        fast = fast.next.next;
    }
    return true; //cycle detected
}

function startingPointOfCycle(head){
    let slow = head;
    let fast = head;

    do {
        if(fast == null || fast.next == null){
            return false; //no cycle
        }
        slow = slow.next;
        fast = fast.next.next;
    } while(slow != fast)

    let temp = head;
    while(slow != temp){
        slow = slow.next;
        temp = temp.next;
    }
    return slow; //starting point of cycle
}

function removeCycleOfLinkedList(head){
    let slow = head;
    let fast = head;

    do {
        if(fast == null || fast.next == null){
            return false; //no cycle
        }
        slow = slow.next;
        fast = fast.next.next;
    } while(slow != fast)

    let temp = head;
    while(slow.next != temp.next){
        slow = slow.next;
        temp = temp.next;
    }
    slow.next = null; //cycle removed
}

// let ll = new SinglyLinkedList();
// ll.insertAtHead(10);
// ll.insertAtTail(20);
// ll.insertAtTail(30);
// ll.insertAtTail(40);
// //cycle created
// ll.head.next.next.next.next = ll.head.next;
// console.log("cycle detected : ", cycleDetection(ll.head));
// console.log("starting point of cycle : ", startingPointOfCycle(ll.head));
// removeCycleOfLinkedList(ll.head);
// ll.printLinkedListData();


function length(head){
    let count = 0;
    let temp = head;
    while(temp != null){
        count++;
        temp = temp.next;
    }
    return count;
}

//get intersection of linked list
function getIntersection(headA, headB){
    let lenA = length(headA);
    let lenB = length(headB);
    //move headA to the same length as lenB
    while(lenA > lenB){
        headA = headA.next;
        lenA--;
    }
    //move headB to the same length as lenA
    while(lenB > lenA){
        headB = headB.next;
        lenB--;
    }

    //find intersection untill end
    while(headA != headB){
        headA = headA.next;
        headB = headB.next;
    }
    return headA;
}
let llA = new SinglyLinkedList();
llA.insertAtHead(10);
llA.insertAtTail(20);
llA.insertAtTail(30);
llA.insertAtTail(40);

let llB = new SinglyLinkedList();
llB.insertAtHead(100);
//making the insersection at 30
llB.head.next = llA.head.next.next;


llA.printLinkedListData();
llB.printLinkedListData();
let intersectionNode =  getIntersection(llA.head, llB.head);
console.log("both linked lists are intersecting at node : ",intersectionNode.data);




